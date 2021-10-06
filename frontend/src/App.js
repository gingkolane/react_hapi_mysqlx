import React, { Component } from 'react';

//create a connection pool(client)
const mysqlx = require('@mysql/xdevapi')
const config = require('./config')
var client = mysqlx.getClient(config.connectionUrl, config.connectionPool)
var session = client.getSession()
var db = session.getDefaultSchema()

class App extends Component {

  state = {
    newDoctorName:'',
    newDoctorFacility: '',
    newDoctorZip: '',
    zipToUpdate: '', 
    selectedDoctorId: '',
    doctorDataArr: []
  }

  // record input
  handleChange = (e) => { this.setState({ [e.target.name]: e.target.value })}

  fetchDoctors = async() => { 

    var client = mysqlx.getClient(config.connectionUrl, config.connectionPool)
    var session = client.getSession()
    var db = session.getDefaultSchema()

    // fetchAll() returns an array of individual doctor data in array:
    const doctorDataArray = await db.getTable('doctors').select().execute().fetchAll()
    
    // Assign doctorObjArr data to this.state.doctorObjArr
    this.setState({doctorDataArray: doctorDataArray})
  }
  

  // add doctor to database, then update the show doctor 
  addDoctor = async() => {

    //insert the new doctor in database
    const generatedDoctorId = await db.getTable('doctors')
            .insert('doctor_Name', 'FACILITY_NAME', 'ZIP')
            .values(this.state.newDoctorName, this.state.newDoctorFacility, this.state.newDoctorZip)
            .execute()
            .getAutoIncrementValue()
            
    // update the frontend of the insert result

    let response

    if (!!generatedDoctorId) {
      const newDoctorCreated = await this.db.getTable("doctors").select('doctor_Name', 'FACILITY_NAME', 'ZIP').where('id like :id').bind('id', generatedDoctorId).execute()

      response = <h1>`You have created a new doctor: ${newDoctorCreated.name}`</h1>
    
    } else {
      response = <h1> "something is wrong"</h1>
    }
    
    return response

  }

  //update the doctor inline, then in the database
  updateDoctor = async(doctorID) => {

    // update the doctor line to reflect the new zip code
    this.setState({ 
      zipToUpdate: this.state.zipToUpdate
    })

    // update doctor information in database
    await db.getTable('doctors').update().set('ZIP', this.state.zipToUpdate).where(`id = {doctorID}`).execute()

    // update doctor display
    await this.fetchDoctors()
 
  }

  deleteDoctor = async(doctorID) => {

    // delete the doctor in database
    await db.getTable('doctors').delete().where(`id = {doctorID}`)

    // update doctor display
    await this.fetchDoctors()

  }
 
  render() {
     return (
      <div className="App">

        <h3>3rd hello world from within render in App.js</h3>

        {/* Add my doctor */}
        <div>
          <form onSubmit={this.addDoctor}>
            <label>Doctor Name:</label>
            <input placeholder="Doctor Name" type="text" value={this.state.newDoctorName} onChange={this.handleChange} name="newDoctorName" />
            <label>Facility Name:</label>
            <input placeholder="Facility Name" type="text" value={this.state.newDoctorFacility} onChange={this.handleChange} name="newDoctorFacility" />
            <label>Zip code:</label>
            <input placeholder="Zip code" type="text" value={this.state.newDoctorZip} onChange={this.handleChange} name="newDoctorZip" />
            <input type="submit" value="Add a new doctor" />
          </form>
        </div>

        <div>response</div>

        {/* Display all doctors */}
        <div>
          <button onClick={this.fetchDoctors}>Show Doctors</button>

          {this.state.doctorDataArray.map((oneDoctorData) => {
            return (
              <div>
                <div>
                  <h3>Name: {oneDoctorData[1]}</h3>
                  <h3>Facility: {oneDoctorData[3]}</h3>
                  <h3>Zip code: {oneDoctorData[6]}</h3>
                </div>
                <div>
                  <input placeholder="Zip code" type="text" value={this.state.zipToUpdate} onChange={this.handleChange} name="zipToUpdate" />
                  <button onClick={this.updateDoctor(oneDoctorData[0])}> Update </button>
                  <button onClick={this.deleteDoctor(oneDoctorData[0])}> Delete </button>
                </div>
              </div>
              );
            })
          }
        </div>
      </div>
     )
   }
}

export default App;