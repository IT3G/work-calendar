const config = require('./config');
const mongoose = require('mongoose');

mongoose.connect(config.DATABASE_URL, { useNewUrlParser: true });

const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  id: Number,
  name: String,
  title: String
});

const SubdivisionSchema = new Schema({
  name: String
});

const JobPositionSchema = new Schema({
  name: String
});

const UserSchema = new Schema({
  username: String,
  location: String,
  position: String,
  projects: [
    {
      dateStart: String,
      dateEnd: String,
      project: { type: Schema.Types.ObjectId, ref: 'Project' },
      title: String
    }
  ],
  whenCreated: String,
  email: String,
  telNumber: String,
  physicalDeliveryOfficeName: String,
  mailNickname: String,
  isAdmin: Boolean,
  hasMailing: Boolean,
  subdivision: { type: Schema.Types.ObjectId, ref: 'Subdivision' },
  jobPosition: { type: Schema.Types.ObjectId, ref: 'JobPosition' },
  authType: String,
  hashPswd: String
});

const ProjectModel = mongoose.model('Project', ProjectSchema);
const UserModel = mongoose.model('User', UserSchema);
const SubdivisionModel = mongoose.model('Subdivision', SubdivisionSchema);
const JobPositionModel = mongoose.model('JobPosition', JobPositionSchema);

async function updateUsers() {
  await ProjectModel.updateMany({}, { $rename: { title: 'name' } }, { multi: true }, callback);
  
  const projects = await ProjectModel.find().sort({ username: 'asc' });
  const users = await UserModel.find()
    .populate('jobPosition')
    .populate('subdivision')
    .sort({ username: 'asc' });


  users.forEach(async u => {
    u.projects = u.projects.map(p => {
      const res = {
        dateStart: p.dateStart,
        dateEnd: p.dateEnd,
        project: projects.find(pr => pr.name === p.title)
      };

      return res;
    });

    await UserModel.findByIdAndUpdate(u._id, u, callback);
  });
}

updateUsers();

function callback(err, blocks) {
  if (err) {
    throw err;
  }
  console.log('done!');
}
