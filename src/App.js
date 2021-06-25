import './App.css';
import React, { useState, useEffect } from 'react';
import { userSchema } from "./Validation/validation";
import axios from "axios";
// import { Marketing } from './Validation/Validator';
const Timeframe = [
  {
    label: "Time Frame",
    value: 1,
  },
  {
    label: "2 years",
    value: 2,
  },
  {
    label: "3 years",
    value: 3,
  },
  {
    label: "4 years",
    value: 4,
  },
  {
    label: "5 years",
    value: 5,
  },
];

const Country = [
  {
    label: "Select Country",
    value: 1,
  },
  {
    label: "England",
    value: 2,
  },
  {
    label: "USA",
    value: 3,
  },
  {
    label: "Wales",
    value: 4,
  },
  {
    label: "Spain",
    value: 5,
  },
];

const CompanyHQ = [
  {
    label: "Select CompanyHQ",
    value: 1,
  },
  {
    label: "Florida",
    value: 2,
  },
  {
    label: "Mexico",
    value: 3,
  },
  {
    label: "Paris",
    value: 4,
  },
  {
    label: "Mumbai",
    value: 5,
  },
];

const HearAbout = [
  {
    label: "Select",
    value: 1,
  },
  {
    label: "From LinkedIn",
    value: 2,
  },
  {
    label: "From Socail Media",
    value: 3,
  },
  {
    label: "Our employees",
    value: 4,
  },
  {
    label: "Other",
    value: 5,
  },
];


const Revenue = [
  {
    label: "Select",
    value: 1,
  },
  {
    label: "$20,000",
    value: 2,
  },
  {
    label: "$40,000",
    value: 3,
  },
  {
    label: "$60,000",
    value: 4,
  },
  {
    label: "$80,000",
    value: 5,
  },
];


const Industry = [
  {
    label: "Select",
    value: 1,
  },
  {
    label: "IT",
    value: 2,
  },
  {
    label: "Sales",
    value: 3,
  },
  {
    label: "HR",
    value: 4,
  },
  {
    label: "Finance",
    value: 5,
  },
];

function App() {

  const [submitFormData, setsubmitFormData] = useState({
    FName: "",
    LName: "",
    Title: "",
    Company: "",
    Phone: "",
    Email: "",
    textAreaa: "",
    Country: "",
    CompanyHQ: "",
    HearAbout: "",
    Revenue: "",
    Industry: "",
    TimeFrame: "",
    Marketing: [],
    Sales: [],

  } )

  // const [Marketing, setMarketing] = useState([])
  const [Sales, setSales] = useState([])

  const [Errors, setErrors] = useState()
  const getErrors = (err) => {
    const allErrors = {};
    err.inner.forEach((e) => {
      if (allErrors[e.path]) {
        allErrors[e.path].push(e);
      } else {
        allErrors[e.path] = [e];
      }
    });

    return allErrors;
  }


  const [checked1, setChecked1] = useState([])
  const getCheck1 = () => {
    axios.get('https://60d057db7de0b2001710859d.mockapi.io/Marketing')
      .then(function (response) {
        setChecked1(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  const [checked2, setChecked2] = useState([])
  const getCheck2 = () => {
    axios.get('https://60d057db7de0b2001710859d.mockapi.io/Sales')
      .then(function (response) {
        setChecked2(response.data)
        // console.log(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    getCheck1()
    getCheck2()
  }, [])

  const onChangeCheckBox = (id) => {
    const selectedCheckboxes = submitFormData.Marketing;
    const findIdx = selectedCheckboxes.indexOf(id);
    if (findIdx > -1) {
      selectedCheckboxes.splice(findIdx, 1);
    } else {
      selectedCheckboxes.push(id);
    }
    setsubmitFormData({
      ...submitFormData,
      Marketing: selectedCheckboxes
    })
    console.log(submitFormData.Marketing)

  }

  const onChangeCheckBox_For_Sale = (id) => {
    const selectedCheckboxes = submitFormData.Sales;
    const findIdx = selectedCheckboxes.indexOf(id);
    if (findIdx > -1) {
      selectedCheckboxes.splice(findIdx, 1);
    } else {
      selectedCheckboxes.push(id);
    }
    // setSales(selectedCheckboxes)

    setsubmitFormData({
      ...submitFormData,
      Sales: selectedCheckboxes
    })
  }

  const onChangee = (e) => {
    const value = e.target.value
    setsubmitFormData({
      ...submitFormData, [e.target.name]: value,
    })
    setErrors({ ...Errors, [e.target.name]: "" })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = {
      FName: submitFormData.FName,
      LName: submitFormData.LName,
      Title: submitFormData.Title,
      Company: submitFormData.Company,
      Phone: submitFormData.Phone,
      Email: submitFormData.Email,
      textArea: submitFormData.textAreaa,
      Country: submitFormData.Country,
      CompanyHQ: submitFormData.CompanyHQ,
      HearAbout: submitFormData.HearAbout,
      Industry: submitFormData.Industry,
      Revenue: submitFormData.Revenue,
      TimeFrame: submitFormData.TimeFrame,
      Marketing: submitFormData.Marketing,

    }
    setErrors({})
    const isValid = await userSchema.validate(formData, { abortEarly: false })

      .catch(function (err) {
        const allErrs = getErrors(err);
        setErrors(allErrs)

      });
    if (isValid !== undefined) {
      alert("Form submitted sucessfully")
    }
  };



  return (
    <div className="container">
      <div className="maindiv">
        <h3>Section 1 - Required</h3>
        <form onSubmit={handleSubmit}>
          <div className="form_div">
            <label>*First Name:</label>
            <div className="errordiv">
              <input type="text" name="FName" value={submitFormData.FName} onChange={e => {
                onChangee(e)
              }} placeholder="First Name" />
              <small>{Errors?.FName?.[0]?.message}</small>
            </div>
          </div>
          <div className="form_div">
            <label>*Last Name:</label>
            <div className="errordiv">
              <input type="text" name="LName" value={submitFormData.LName} onChange={e => {
                onChangee(e)
              }} placeholder="Last Name" />
              <small>{Errors?.LName?.[0]?.message}</small>
            </div>
          </div>
          <div className="form_div">
            <label>*Title:</label>
            <div className="errordiv">
              <input type="text" name="Title" value={submitFormData.Title} onChange={e => {
                onChangee(e)
              }} placeholder="Title" />
              <small>{Errors?.Title?.[0]?.message}</small>
            </div>
          </div>
          <div className="form_div">
            <label>*Company:</label>
            <div className="errordiv">
              <input type="text" name="Company" value={submitFormData.Company} onChange={e => {
                onChangee(e)
              }} placeholder="Company" />
              <small>{Errors?.Company?.[0]?.message}</small>
            </div>
          </div>
          <div className="form_div">
            <label>*Phone:</label>
            <div className="errordiv">
              <input type="text" name="Phone" value={submitFormData.Phone} onChange={e => {
                onChangee(e)
              }} placeholder="Phone" />
              <small>{Errors?.Phone?.[0]?.message}</small>
            </div>
          </div>
          <div className="form_div">
            <label>*Email:</label>
            <div className="errordiv">
              <input type="email" name="Email" value={submitFormData.Email} onChange={e => {
                onChangee(e)
              }} placeholder="Email" />
              <small>{Errors?.Email?.[0]?.message}</small>
            </div>
          </div>
          <div className="form_div">
            <label>*Country/Region:</label>
            <div className="errordiv">
              <select
                value={submitFormData.Country}
                name="Country"
                onChange={e => {
                  onChangee(e)
                }}>
                {
                  Country.map((country) => <option key={country.id}>{country.label}</option>)
                }
              </select>
              <small>{Errors?.Country?.[0]?.message}</small>
            </div>
          </div>
          <div className="form_div">
            <label>*Company HQ State/Province:</label>
            <div className="errordiv">
              <select
                value={submitFormData.CompanyHQ}
                name="CompanyHQ"
                onChange={e => {
                  onChangee(e)
                }}>
                {
                  CompanyHQ.map((companyHQ) => <option key={companyHQ.id}>{companyHQ.label}</option>)
                }
              </select>
              <small>{Errors?.CompanyHQ?.[0]?.message}</small>
            </div>
          </div>
          <div className="form_div">
            <label>*How did you hear about Eloqua?</label>
            <div className="errordiv">
              <select value={submitFormData.HearAbout}
                name="HearAbout"
                onChange={e => {
                  onChangee(e)
                }}>
                {
                  HearAbout.map((hearabout) => <option key={hearabout.id}>{hearabout.label}</option>)
                }
              </select>
              <small>{Errors?.HearAbout?.[0]?.message}</small>
            </div>
          </div>
          <div className="form_div">
            <label>*Your Industry:</label>
            <div className="errordiv">
              <select
                name="Industry"
                value={submitFormData.Industry}
                onChange={e => {
                  onChangee(e)
                }}>
                {
                  Industry.map((industry) => <option key={industry.id}>{industry.label}</option>)
                }
              </select>
              <small>{Errors?.Industry?.[0]?.message}</small>
            </div>
          </div>
          <div className="form_div">
            <label>*Your company Revenue ($ USD):</label>
            <div className="errordiv">
              <select
                name="Revenue"
                value={submitFormData.Revenue}
                onChange={e => {
                  onChangee(e)
                }}>
                {
                  Revenue.map((revenue) => <option key={revenue.id}>{revenue.label}</option>)
                }
              </select>
              <small>{Errors?.Revenue?.[0]?.message}</small>
            </div>
          </div>


          <h3>Section 2 - Optional</h3>
          <div className="check_box_container">
            <label>My Top Marketing Challenges are:</label>
            <div>
              {checked1.map(item =>
                <section>
                  <label key={item.key}><input id="chechbox" name="Marketing"
                    selected={submitFormData.Marketing.includes(item.id)}
                    onChange={e => {
                      onChangeCheckBox(item.id)
                    }} type="checkbox" />{item.value}</label>
                  <br></br>
                </section>
              )}
            </div>
          </div>

          <div className="check_box_container">
            <label>Our Sales Team consists of:</label>
            <div>
              {checked2.map(item =>
                <section>
                  <label key={item.key}><input id="chechbox" name="Sales"
                    selected={submitFormData.Sales.includes(item.id)}
                    onChange={e => {
                      onChangeCheckBox_For_Sale(item.id)
                    }} type="checkbox" />{item.value}</label>
                  <br></br>
                </section>
              )}

            </div>
          </div>

          <div className="check_box_container">
            <label>I'm interested in finding out<br></br> more about:</label>
            <div className="errordiv">
              <textarea id="finding_out" name="textAreaa" value={submitFormData.textAreaa} onChange={e => {
                onChangee(e)
              }
              } rows="4" cols="40">
              </textarea>
              <small>{Errors?.textArea?.[0]?.message}</small>
            </div>
          </div>

          <div className="check_box_container">
            <label>My timeframe for a soloution is:</label>
            <select
              name="TimeFrame"
              value={submitFormData.TimeFrame}
              onChange={e => {
                onChangee(e)
              }}>
              {
                Timeframe.map((timeframe) => <option>{timeframe.label}</option>)
              }
            </select>
          </div>
          <input type="submit" id="submit" />
        </form>
      </div>
    </div>
  );
}
export default App;
