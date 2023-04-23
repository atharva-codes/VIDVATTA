//ADD THE DATABASE URL GIVEN BELOW//
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
});

const Admin = mongoose.model('Admin', adminSchema);

async function createAdmin() {
  await mongoose.connect('mongodb+srv://<DB NAME>:<DB PASSWORD>@cluster0.1tzcp2l.mongodb.net/<DATABASE>?retryWrites=true&w=majority');

  // Hash the password
  const saltRounds = 10;
  //replace YOURPASSWORD with your passowrd
  const password = 'YOURPASSWORD';
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Create the admin
  const admin = new Admin({
      //replace vidvatta and give your username
    username: 'vidvatta',
    password: hashedPassword
  });

  // Save the admin to the database
  await admin.save();

  console.log('Admin created successfully');

  await mongoose.disconnect();
}

createAdmin();
//NOW RUN- node createAdmin.js
//After running complete you can login 