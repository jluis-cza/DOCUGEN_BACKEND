// ADMINISTRATION CONTROLLER
import SystemParameter from '../../models/docugen-web/SystemParameter.js';
import { USERS } from '../../constants/users.js';
import { MESSAGES } from '../../constants/messages.js';

// System parameters Monitor
export const systemParametersGetter = async (req, res) => {
  try {
    // Checking user's role
    const userRole = req.user.role;
    if (userRole !== USERS.server.role.administrator) {
      return res.status(403).json({
        success: false,
        message: MESSAGES.general.access.error.role,
      });
    }

    // params
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const sortBy = req.query.sortBy || 'name';
    const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1;

    // Filer of search
    const filter = {};
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { alias: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (page - 1) * limit; // Jump
    const sort = { [sortBy]: sortOrder }; // Order of list

    // Parallel query
    const { systemParameters, total } = await SystemParameter.getCustomizedSystemParameters(
      filter,
      sort,
      skip,
      limit
    );

    const totalPages = Math.ceil(total / limit);

    if (total === 0) {
      return res.status(200).json({
        success: true,
        message: 'No results found.',
      });
    }
    console.log({ systemParameters: systemParameters });
    return res.status(200).json({
      success: true,
      message: 'A customized set of system parameters was retrieved successfully.',
      data: systemParameters,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error getting all system parameters.',
      error: error.message,
    });
  }
};

// System parameter configuration
export const systemParameterSetter = async (req, res) => {
  try {
    // Checking user's role
    const userRole = req.user.role;
    if (userRole !== USERS.server.role.administrator) {
      return res.status(403).json({
        success: false,
        message: MESSAGES.general.access.error.role,
      });
    }
    const arrivingParameterStatusConfig = req.body;
    //Finding the Parameter
    const systemParameterRetrieved = await SystemParameter.findSystemParameter(
      arrivingParameterStatusConfig.parameterId
    );
    if (!systemParameterRetrieved) {
      return res.status(400).json({
        //Asumming client error preference
        success: false,
        message: 'It doesn´t exist a system parameter associated with this id.',
      });
    }
    const affectedFields = req.body.affectedFields;
    if (affectedFields.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No fields to operate with were specified.',
      });
    }
    let systemParameterUpdated = null;
    for (const field of affectedFields) {
      switch (field) {
        case 'status': {
          // Setting the status
          systemParameterUpdated = await systemParameterRetrieved.setSystemParameterStatus(
            arrivingParameterStatusConfig.field
          );
          if (!systemParameterUpdated) {
            return res.status(400).json({
              //Asumming client error preference
              success: false,
              message: 'Incorrect status value.',
            });
          }
          break;
        }
        default: {
          return res.status(400).json({
            success: false,
            message: 'Incorrect field reference. No field was updated.',
          });
        }
      }
    }

    //Sending the response
    return res.status(200).json({
      success: true,
      message: 'System parameter successfully set.',
      systemParameterData: systemParameterUpdated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error in setting system parameter.',
      error: error.message,
    });
  }
};
