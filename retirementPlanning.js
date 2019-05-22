const fs = require('fs');
const _ = require("lodash");
const inquirer = require('inquirer');

try {
    fs.unlinkSync("retirement.txt")
} catch (error) {

}

var total = 0;
var initInvested = 0


inquirer
    .prompt([
        {
            type: "input",
            name: "initialInvestment",
            message: "What is your initial investment?  If none enter 0.",
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

        var initInvested = parseFloat(answers.initialInvestment)
        var yearlyAmountToInvest = parseFloat(answers.amountToInvest);
        var numOfYearsToInvest = parseFloat(answers.numOfYears)
        var roi = parseFloat(answers.return)
        var expectReturnOnInvestment = roi / 100
        printStats(initInvested, yearlyAmountToInvest, numOfYearsToInvest, expectReturnOnInvestment)


    })



function printStats(initInvested, yati, noyti, eroi) {

    console.log(initInvested);
    var initial = initInvested

    for (let i = 0; i < noyti; i++) {

        var amount = initial + yati + total;
        var gains = amount * eroi;
        total = amount + gains;
        initial = 0;
        var yearNum = i + 1;

        var a = amount.toFixed(2)
        var b = gains.toFixed(2)
        var c = total.toFixed(2)
        var d = yati.toFixed(2)

        fs.appendFileSync('retirement.txt', "Year " + yearNum + '\n');
        fs.appendFileSync('retirement.txt', "Amount: $" + a + "||   Amount Invested: $" + d + "||   Expected Return: $" + b + "||    Total: $" + c + '\n');
    }

}