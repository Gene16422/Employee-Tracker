const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: 'localhost',

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: 'root',

    // Your password
    password: 'password',
    database: 'employeeTrackerDB',
});
//Inquirer prompts
const start = () => {
    inquirer.prompt([
        {
            name: "choice",
            choices: ["view departments", "view roles", "view employees","add department", "add role", "add employee", "update employee role"],
            message: "What do you want to do?",
            type: "list"
        }
    ]).then(answers => {
        switch (answers.choice) {
            case "view departments":
                departmentView()
                break;

            case "view roles":
                rolesView()
                break;

            case "view employees":
                employeesView()
                break;

            case "add department":
                addDepartment()
                break;

            case "add role":
                addRole()
                break;

            case "add employee":
                addEmployee()
                break;

            case "update employee role":
                addEmployee()
                break;

            default:
                console.log("see ya!")
                connection.end();
                break;
        }
    })
}
//view Department, roles, employees,
const departmentView = () => {
    connection.query('SELECT * FROM department', (err, res) => {
      if (err) throw err;
      console.table(res);
      start();
    });
};

const rolesView = () => {
    connection.query('SELECT * FROM role', (err, res) => {
      if (err) throw err;
      console.table(res);
      start();
    });
};

const employeesView = () => {
    connection.query('SELECT * FROM employee', (err, res) => {
      if (err) throw err;
      console.table(res);
      start();
    });
};
//add department, roles, employessions

const addDepartment = () => {
    inquirer
    .prompt(
      {
        name: 'name',
        type: 'input',
        message: 'What is the department you would like to add?',
      }
    )
    .then((answer) => {
            // when finished prompting, insert a new item into the db with that info
        connection.query(
            'INSERT INTO department SET ?',
            {
            name: answer.name,
            },
            (err) => {
            if (err) throw err;
            console.log('Your department was created successfully!');
            // re-prompt the user for if they want to bid or post
            start();
            }
        )
    });
};

const addRole = () => {
    inquirer
    .prompt([
      {
        name: 'title',
        type: 'input',
        message: 'What is the role you would like to add?',
      },
      {
        name: 'salary',
        type: 'input',
        message: 'What is the salary for this role?',
      },
    ])
    .then((answer) => {
    // when finished prompting, insert a new item into the db with that info
    connection.query(
        'INSERT INTO role SET ?',
        {
        title: answer.title,
        salary: answer.salary,
        },
        (err) => {
        if (err) throw err;
        console.log('Your role was created successfully!');
        // re-prompt the user for if they want to bid or post
        start();
        }
    )})
};

const addEmployee = () => {
    inquirer
    .prompt([
      {
        name: 'first_name',
        type: 'input',
        message: "What is the employee's first name?",
      },
      {
        name: 'last_name',
        type: 'input',
        message: "What is the employee's last name?",
      },
      {
        name: 'role_id',
        type: 'input',
        message: "What is the employee's title?",
      },
      {
        name: 'manager_id',
        type: 'input',
        message: "Who is the employee's manager?",
      },
    ])
    .then((answer) => {
    // when finished prompting, insert a new item into the db with that info
    connection.query(
        'INSERT INTO employee SET ?',        
        {
        first_name: answer.first_name,
        last_name: answer.last_name,
        role_id: answer.role_id,
        manager_id: answer.manager_id,
        },
        (err) => {
        if (err) throw err;
        console.log('Your employee was added successfully!');
        // re-prompt the user for if they want to bid or post
        start();
        }
    )})
};

const showAddedEmployee = () => {
    console.log('Employee Added\n');
    connection.query(`
    SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department_name, role.department_id
    FROM employee
    JOIN role
    ON role.id = employee.role_id
    JOIN department ON role.department_id = department.id
    `,
    (err, res) => {
        if (err) throw err;
        console.table(res);
    })
};

//update employee roles
const updateEmployeeRole = () => {
    console.log('Updating employee role...\n');
    const query = connection.query(
      'UPDATE employee SET ? WHERE ?',
      [
        {
        first_name: answer.first_name,
        last_name: answer.last_name,
        role_id: answer.role_id,
        manager_id: answer.manager_id,
        },
        
      ],
      (err, res) => {
        if (err) throw err;
        console.log(`${res.affectedRows} employee updated!\n`);
        
      }
    );
  
    // logs the actual query being run
    console.log(query.sql);
  };

connection.connect((err) => {
    if (err) throw err;
    console.log("config done!")
    start()
})