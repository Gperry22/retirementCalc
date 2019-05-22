const fs = require('fs');
const _ = require("lodash");
const inquirer = require('inquirer');

try {
    fs.unlinkSync("retirement.txt")
} catch (error) {

}


inquirer
    .prompt([
        {
            type: "input",
            name: "amountToInvest",
            message: "Please enter the yearly amount you plan to invest",
            validate: function (input) {
                var pass = /^[0-9][A-Za-z0-9 -]*$/.test(input);
                if (pass) {
                    return true;
                }
                return 'Please enter a number';
            }
        },
        {
            type: "input",
            name: "numOfYears",
            message: "Please enter the number of years you plan to invest this yearly amount.",
            validate: function (input) {
                var pass = /^[0-9][A-Za-z0-9 -]*$/.test(input);
                if (pass) {
                    return true;
                }
                return 'Please enter a number';
            }
        },
        {
            type: "input",
            name: "return",
            message: "Please enter the expected yearly return",
            validate: function (input) {
                var pass = /^[0-9][A-Za-z0-9 -]*$/.test(input);
                if (pass) {
                    return true;
                }
                return 'Please enter a number';
            }
        },

    ]).then((answers) => {

        var yearlyAmountToInvest = parseFloat(answers.amountToInvest);
        var numOfYearsToInvest = parseFloat(answers.numOfYears)
        var roi = parseFloat(answers.return)
        var expectReturnOnInvestment = roi / 100
        printStats(yearlyAmountToInvest, numOfYearsToInvest, expectReturnOnInvestment)

    })

var total = 0;

function printStats(yati, noyti, eroi) {

    for (let i = 0; i < noyti; i++) {

        var amount = yati + total;
        var gains = amount * eroi;
        total = amount + gains;
        var yearNum = i + 1;

        var a = amount.toFixed(2)
        var b = gains.toFixed(2)
        var c = total.toFixed(2)

        fs.appendFileSync('retirement.txt', "Year " + yearNum + '\n');
        fs.appendFileSync('retirement.txt', "Amount: $" + a + "    Expected Return: " + b + "    Total: " + c + '\n');
    }

}