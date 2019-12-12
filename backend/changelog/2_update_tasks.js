const config = require('./config');
const mongoose = require('mongoose');
const moment = require('moment');

mongoose.connect(config.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const Schema = mongoose.Schema;

const TasksSchema = new Schema({
  type: String,
  dateStart: String,
  dateEnd: String,
  employee: String,
  comment: String,
  dtCreated: String,
  employeeCreated: String
});

const TasksModel = mongoose.model('Task', TasksSchema);

async function updateTasks() {
  const remapDate = date => {
    const result = moment(date)
      .add(1, 'd')
      .toISOString()
      .substr(0, 10);

    return result;
  };

  const tasks = await TasksModel.find();

  tasks.forEach(async task => {
    task.dateStart = remapDate(task.dateStart);
    task.dateEnd = remapDate(task.dateEnd);

    await TasksModel.findByIdAndUpdate(task._id, task, callback);
  });
}

updateTasks();

function callback(err, operationResult) {
  if (err) {
    throw err;
  }
  console.log('done!');
}
