import { useState } from 'react';
import './Form.css';

function Form() {
   const [form, setForm] = useState({
      pregnancies: "",
      glucose: "",
      blood_presure: "",
      skin_thickness: "",
      insulin_level: "",
      bmi: "",
      diabetes_pedigree: "",
      age: ""
   });

   const [loading, setLoading] = useState(false);
   const [result, setResult] = useState("");

   const handleSubmit = (event) => {
      event.preventDefault();

      const form_data = new FormData();
      form_data.append("1", form.pregnancies);
      form_data.append("2", form.glucose);
      form_data.append("3", form.blood_presure);
      form_data.append("4", form.skin_thickness);
      form_data.append("5", form.insulin_level);
      form_data.append("6", form.bmi);
      form_data.append("7", form.diabetes_pedigree);
      form_data.append("8", form.age);

      setLoading(true);

      fetch('http://127.0.0.1:5000/predict', {
         method: 'POST',
         body: form_data
      })
         .then(response => response.text())
         .then(html => {
            setResult(html);
            setLoading(false);
         })
   };

   const onChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setForm({ ...form, [name]: value });
   };

   const handleClear = () => {
      setForm({
         pregnancies: "",
         glucose: "",
         blood_presure: "",
         skin_thickness: "",
         insulin_level: "",
         bmi: "",
         diabetes_pedigree: "",
         age: ""
      });

      setResult("");
   };

   return (
      <form onSubmit={handleSubmit}>
         <h4>Diabetes Prediction Model</h4>
         <p>Example to Predict Probability of Diabetes</p>
         <input type="number" name="pregnancies" value={form.pregnancies} onChange={onChange} placeholder="Number of Pregnancies" required />
         <input type="number" name="glucose" onChange={onChange} value={form.glucose} placeholder="Glucose level in Sugar" required />
         <input type="number" name="blood_presure" onChange={onChange} value={form.blood_presure} placeholder="Blood Presure" required />
         <input type="number" name="skin_thickness" onChange={onChange} value={form.skin_thickness} placeholder="Skin Thickness" required />
         <input type="number" name="insulin_level" onChange={onChange} value={form.insulin_level} placeholder="Insulin Level" required />
         <input type="number" name="bmi" onChange={onChange} value={form.bmi} placeholder="Body Mass Index (BMI)" required />
         <input type="number" name="diabetes_pedigree" onChange={onChange} value={form.diabetes_pedigree} placeholder="Diabetes Pedigree Function" required />
         <input type="number" name="age" onChange={onChange} value={form.age} placeholder="Age" required />
         <button type="submit" disabled={loading}>{loading ? "Predicting Result..." : "Submit Form"}</button>
         {result && <span onClick={handleClear}>Clear Prediction</span>}

         {result && <div dangerouslySetInnerHTML={{ __html: result }} className="result" />}
      </form>
   );
}

export default Form;