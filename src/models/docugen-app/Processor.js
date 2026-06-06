// // Processor MODEL

// import mongoose from 'mongoose';

// // *************************************************************************************************
// // SubDocument
// // enlace al modelo de "Process" que es el registro de actividades internas de los dos servicios

// // *************************************************************************************************
// // Document
// const ProcessorSchema = new mongoose.Schema(
//   {
//     status: {
//       type: String,
//       enum: ['running', 'stopped'],
//       default: 'running',
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// // *************************************************************************************************
// // Methods
// ProcessorSchema.methods.getProcessorStatus = async function () {
//     const processor = this;
//     return processor.status;
// };

// ProcessorSchema.methods.setProcessorStatus = async function (status) {
//   if (!status) throw new Error('E0704');
//   if (status === 'running' || status === 'stopped') {
//     const processor = this;
//     processor.status = status;
//     return await processor.save();
//   } else {
//     throw new Error('E0705');
//   }
// };

// const Processor = mongoose.model('Processor', ProcessorSchema);
// export default Processor;
