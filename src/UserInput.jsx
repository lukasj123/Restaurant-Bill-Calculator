import { useState } from 'react'
import './UserInput.css'

export default function UserInput() {


    const [errors, setErrors] = useState({}) // This allows errors to be altered based on user activity

    const [formData, setFormData] = useState({ // This allows form data to be altered based on user activity
        billTotal: '',
        numberOfGuests: '',
        tipPercent: '20%'
    })

    const [outputData, setOutputData] = useState({ // This allows the calculateTip() function to work
        tip: 0,
        splitAmount: 0,
        totalAmount: 0
    })

    function handleChange(e) { // This function will update form data and errors when it is executed (and will be used to handle changes in the user form)
        const { name, value } = e.target

        setFormData({ ...formData, [name]: value })

        setErrors({ ...errors, [name]: '' })
    }

    function handleTipChange(e) {
        let value = e.target.value.replace('%','');
        if (value.indexOf(value,'%') === -1) {
            value = value+'%';
        }
        setFormData({ ...formData, tipPercent: value })
    }

    function calculateTip() { // This function will calculate the tip and split amount per person and then update the output

        const outputTotal = parseFloat(formData.billTotal)
        const no_Guests = parseInt(formData.numberOfGuests)
        const tipPercentage = parseFloat(formData.tipPercent) / 100

        const tipAmount = outputTotal * tipPercentage
        const amountPerPerson = (outputTotal + tipAmount) / no_Guests
        const totalTotal = outputTotal + tipAmount

        setOutputData({
            tip: tipAmount,
            splitAmount: amountPerPerson,
            totalAmount: totalTotal
        })
    }

    function handleSubmit(e) { // This function will trigger the submission event upon users completing the form

        e.preventDefault(); // This method prevents the default event on submission (page reload)

        const formErrors = {}

        if (!formData.billTotal) formErrors.billTotal = "Bill total is required"
        if (!formData.numberOfGuests) formErrors.numberOfGuests = "Number of guests is required"
        if (!formData.tipPercent) formErrors.tipPercent = "Tip Percentage of service is required"

        if (Object.keys(formErrors).length > 0) {
            console.log("Failed to pass the form")
        } else {
            console.log("Successfully passed the form.")
            calculateTip()

        }
    }

    return (
        <>
            <form className="userInput" onSubmit={handleSubmit}>
                <label htmlFor="billTotal" >Bill Total</label>
                <input type="text" placeholder={'0.00'} name="billTotal" id="billTotal" onChange={handleChange} />

                <label htmlFor="numberOfGuests" >Party Size</label>
                <input type="text" placeholder={'0'} name="numberOfGuests" id="numberOfGuests" onChange={handleChange} />

                <label htmlFor="tipPercent" >Tip Percent</label>
                <input type="text" placeholder={'20%'} name="tipPercent" id="tipPercent" onChange={handleTipChange} />

                <button type="submit">Submit</button>
            </form>
            <div className="output-section">
                <h2>Calculator Results</h2>
                <p>Tip: ${outputData.tip.toFixed(2)}</p>
                <p>Total: ${outputData.totalAmount.toFixed(2)}</p>
                <p>Amount Per Person: ${outputData.splitAmount.toFixed(2)}</p>
            </div>
        </>
    )
}