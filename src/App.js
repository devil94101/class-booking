import React, { Component } from 'react'
import './App.css'
import axios from 'axios'
export class App extends Component {
    state={
       pName:"",
       contact:"",
       Email:"",
       cName:"",
       cAge:"",
       slot:"",
       course:"",
       courseData:[],
       error:{
        pName:{
            error:false,
            errorMsg:""
        },
        email:{
            error:false,
            errorMsg:""
        },
        contact:{
            error:false,
            errorMsg:""
        },
        cAge:{
            error:false,
            errorMsg:""
        },
        cName:{
          error:false,
          errorMsg:""
      }
    }
    }
    handle=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    validate=()=>{
      // console.log(this.state)
      if(this.state.error.pName.error||this.state.error.email.error||this.state.error.cName.error||this.state.error.cAge.error||this.state.error.contact.error){
        alert("please correct errors first")
      }
      else if(this.state.course===""){
        alert("please select a course")
      }
      else if(this.state.slot===""){
        alert('please select a slot')
      }
      else{
         console.log(this.state)
        axios.post('https://backend-class-book.herokuapp.com/api/submit',{
            pName:this.state.pName,
            cName:this.state.cName,
            cAge:this.state.cAge,
            Email:this.state.Email,
            slot:this.state.slot,
            course:this.state.courseData[parseInt(this.state.course)]['course_name'],
            contact:this.state.contact
            
        }).then(res=>{
            this.setState({
                pName:"",
                contact:"",
                Email:"",
                cName:"",
                cAge:"",
                slot:"",
                course:"",
                courseData:[],
                error:{
                 pName:{
                     error:false,
                     errorMsg:""
                 },
                 email:{
                     error:false,
                     errorMsg:""
                 },
                 contact:{
                     error:false,
                     errorMsg:""
                 },
                 cAge:{
                     error:false,
                     errorMsg:""
                 },
                 cName:{
                   error:false,
                   errorMsg:""
               }
             }
             })
             alert("class booked successfully check your mail")
        }).catch(err=>{
            console.log(err.message)
        })
      }
    }
    validEmail=()=>{
    //   var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(this.state.Email===""){
          let x=this.state.error
          x.email={
              errorMsg:"Email should not be empty",
              error:true
          }
          this.setState({
              error:x
          })
      }
      else{
        let x=this.state.error
        x.email={
            errorMsg:"",
            error:false
        }
        this.setState({
            error:x
        })
    }
  }
  validatepName=()=>{
    if(this.state.pName===""){
        let x=this.state.error
        x.pName={
            errorMsg:"UserName should not be empty",
            error:true
        }
        this.setState({
            error:x
        })
    }
    else{
      let x=this.state.error
      x.pName={
          errorMsg:"",
          error:false
      }
      this.setState({
          error:x
      })
  }
  }
    submit=(e)=>{
        e.preventDefault();
        this.validate();
    }
    componentDidMount(){
      axios.get('https://script.google.com/macros/s/AKfycbzJ8Nn2ytbGO8QOkGU1kfU9q50RjDHje4Ysphyesyh-osS76wep/exec').then(res=>{
      console.log(res.data) 
      this.setState({
          courseData:res.data
        })
      }).catch(err=>{
        console.log(err.message)
      })
    }
    validatecName=()=>{
      if(this.state.cName===""){
          let x=this.state.error
          x.cName={
              errorMsg:"Child's name should not be empty",
              error:true
          }
          this.setState({
              error:x
          })
      }
      else{
        let x=this.state.error
        x.cName={
            errorMsg:"",
            error:false
        }
        this.setState({
            error:x
        })
    }
    }
    validNumber=()=>{
      if(this.state.contact===""){
        let x=this.state.error
        x.contact={
            errorMsg:"contact should not be empty",
            error:true
        }
        this.setState({
            error:x
        })
    }
    else if(this.state.contact.length!==10){
        let x=this.state.error
        x.contact={
            errorMsg:"contact number should be of ten digits",
            error:true
        }
        this.setState({
            error:x
        })
    }
    else{
      let x=this.state.error
      x.contact={
          errorMsg:"",
          error:false
      }
      this.setState({
          error:x
      })
  }
    }
    validateAge=()=>{
      if(this.state.cAge===""){
        let x=this.state.error
        x.cAge={
            errorMsg:"child Age should not be empty",
            error:true
        }
        this.setState({
            error:x
        })
    }
    else{
      let x=this.state.error
      x.cAge={
          errorMsg:"",
          error:false
      }
      this.setState({
          error:x
      })
  }
    }

    render() {
      if(this.state.course!=="")
      {
        var t = new Date( parseInt(this.state.courseData[parseInt(this.state.course)]['slots'][0]['slot']));
        console.log(t.toTimeString())
      }
      console.log()
        return (
            <div className="d-flex justify-content-center align-items-center login-container">
            <form className="login-form text-center" onSubmit={this.submit} >
                <h1 className="mb-5 font-weight-light text-uppercase">Book Trial Class</h1>
                <div className="form-group">
                    <input type="text" name="pName" onBlur={this.validatepName} onChange={this.handle} className="form-control rounded-pill form-control-lg" value={this.state.pName} placeholder="Parent's Name"/>
                </div>
                {this.state.error.pName.error?<p style={{
                color:"red"
                }}>{this.state.error.pName.errorMsg}</p>:null}
                <div className="form-group">
                    <input type="number" name="contact" onBlur={this.validNumber} onChange={this.handle} className="form-control rounded-pill form-control-lg" value={this.state.contact} placeholder="Parent's Contact Number" />
                </div>
                {this.state.error.contact.error?<p style={{
                color:"red"
                }}>{this.state.error.contact.errorMsg}</p>:null}
                <div className="form-group">
                    <input type="email" name="Email" onBlur={this.validEmail} onChange={this.handle} className="form-control rounded-pill form-control-lg" value={this.state.Email} placeholder="Parent's Email Id" />
                </div>
                {this.state.error.email.error?<p style={{
                color:"red"
                }}>{this.state.error.email.errorMsg}</p>:null}
                <div className="form-group">
                    <input type="text" name="cName" onBlur={this.validatecName} onChange={this.handle} className="form-control rounded-pill form-control-lg" value={this.state.cName} placeholder="Child Name" />
                </div>
                {this.state.error.cName.error?<p style={{
                color:"red"
                }}>{this.state.error.cName.errorMsg}</p>:null}
                <div className="form-group">
                    <input type="number" name="cAge" onBlur={this.validateAge} onChange={this.handle} className="form-control rounded-pill form-control-lg" value={this.state.cAge} placeholder="Child Age" />
                </div>
                {this.state.error.cAge.error?<p style={{
                color:"red"
                }}>{this.state.error.cAge.errorMsg}</p>:null}
                <div className="form-group">
                    <select name="course" value={this.state.course} onChange={this.handle}>
                      <option value="" >Select Course</option>
                      {this.state.courseData.map((ele,i)=>{
                        return(<option key={i} value={i}>{ele['course_name']}</option>)
                      })}
                    </select>
                    </div>
                 {this.state.course!==""&&( <div className="form-group">
                  <select name="slot" value={this.state.slot} onChange={this.handle}>
                      <option value="" >Select slot</option>
                      {this.state.courseData[parseInt(this.state.course)]['slots'].map((ele,i)=>{

                        var t = new Date( parseInt(ele['slot']));
                      return(<option key={i} value={ele.slot}>{t.toLocaleDateString()+" "}{t.toLocaleTimeString()}</option>)
                      })}
                    </select>
                </div>)}
                <button type="submit" 
                disable={this.state.error?"true":"false"} 
                className="btn mt-5 rounded-pill btn-lg btn-custom btn-block text-uppercase">Book Trial Class</button>
            </form>
        </div>
        )
    }
}

export default App
