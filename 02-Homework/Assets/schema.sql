DROP DATABASE IF EXISTS employeeTrackerDB;
CREATE database employeeTrackerDB;

USE employeeTrackerDB;

CREATE TABLE department(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role(
  id INT NOT NULL AUTO_INCREMENT,
 PRIMARY KEY (id),
 title VARCHAR(30),
 salary DECIMAL,
 department_id INT NOT NULL,
 FOREIGN KEY(department_id) REFERENCES department (id) ON DELETE CASCADE

)

CREATE TABLE employee(
  first_name VARCHAR (30),
  last_name VARCHAR (30),
  role_id INT NOT NULL,
  manager_id INT NOT NULL,
  id INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (id),
  FOREIGN KEY(role_id) REFERENCES role (id) ON DELETE CASCADE
  FOREIGN KEY(manager_id) REFERENCES employee (id) ON DELETE CASCADE
)
INSERT INTO department (name)
VALUES ("Human Resources");

INSERT INTO department (name)
VALUES ("Engineering");

INSERT INTO department (name)
VALUES ("Supply Chain");

INSERT INTO department (name)
VALUES ("Manufacturing");

INSERT INTO department (name)
VALUES ("Information Technology");

INSERT INTO department (name)
VALUES ("Program Managment");

INSERT INTO role(title, salary, department_id)
VALUES ("Director", 125000, 1)

INSERT INTO role(title, salary, department_id)
VALUES ("Manager", 100000, 1)

INSERT INTO role(title, salary, department_id)
VALUES ("Associate", 75000, 1)

INSERT INTO role(title, salary, department_id)
VALUES ("Intern", 50000, 1)

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Gene", "Garnes", 1, 1)

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Joy", "Rhee", 1, 1)