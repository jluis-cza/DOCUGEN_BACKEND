// // Editor MODEL

// import mongoose from 'mongoose';
// // *************************************************************************************************
// // SubDocument
// // enlace al modelo de "Process" que es el registro de actividades internas de los dos servicios

// // *************************************************************************************************
// // Document
// const EditorSchema = new mongoose.Schema(
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
// EditorSchema.methods.getAllEditorStatus = async function () {
//     const editor = this;
//     return editor.status;
// };

// EditorSchema.methods.setAllEditorStatus = async function (status) {
//   if (!status) throw new Error('E0704');
//   if (status === 'running' || status === 'stopped') {
//     const editor = this;
//     editor.status = status;
//     return await editor.save();
//   } else {
//     throw new Error('E0705');
//   }
// };

// const Editor = mongoose.model('Editor', EditorSchema);
// export default Editor;
