INSERT INTO department (name)
VALUES ("Marketing"),
("Information Technology"),
("Accounting"),
("Human Resources"),
("Operations"),
("Sales");

INSERT INTO role (title, salary, department)
VALUES ("Executive VP Marketing", 180000, "Marketing"),
("Project Manager", 120000, "Marketing"),
("Copywriter", 80000, "Marketing"),
("Executive VP Technology", 180000, "Information Technology"),
("Network Administrator", 120000, "Information Technology"),
("Help Desk Support", 80000, "Information Technology");
("Executive VP Finance", 180000, "Accounting"),
("Accounting Manager", 120000, "Accounting"),
("Accountant", 80000, "Accounting");
("Executive VP HR", 180000, "Human Resources"),
("HR Representative", 120000, "Human Resources"),
("Recruiter", 80000, "Human Resources");
("Executive VP Operations", 180000, "Operations"),
("Operations Manager", 120000, "Operations"),
("Operations Engineer", 80000, "Operations");
("Executive VP Sales", 180000, "Sales"),
("Director Sales", 120000, "Sales"),
("Account Executive", 80000, "Sales");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jay", "Gatsby", "1", ""),
("Leopold", "Bloom", "2", "1"),
("Atticus", "Finch", "2", "1"),
("Stephen", "Dedalus", "3", "1"),
("Aureliano", "Buendia", "3", "1"),
("Gregor", "Samsa", "4", ""),
("George", "Smiley", "5", "6"),
("Charles", "Tansley", "5", "6"),
("Jake", "Barnes", "6", "6"),
("Florentino", "Ariza", "6", "6"),
("Judge", "Holden", "7", ""),
("Arthur", "Radley", "8", "11"),
("Avril", "Incandenza", "8", "11"),
("Joelle", "Van Dyne", "9", "11"),
("Donald", "Gately", "9", "11"),
("Henry", "Chinaski", "10", ""),
("Hugh Steeply", "11", "", "16");
("Lennie", "Small", "11", "16");
("Margaret", "Schlegel", "12", "16");
("Beneatha", "Younger", "12", "16");
("Michael Pemulis", "13", "", ""),
("Don", "Quixote", "14", "21");
("Randle", "McMurphy", "14", "21");
("Alexei", "Karamazov", "15", "21");
("Holly", "Golightly", "15", "21");
("Charlie", "Marlow", "16", "");
("Dean", "Moriarty", "17", "26");
("Jo", "March", "17", "26");
("Elizabeth", "Bennett", "18", "26");
("Henry", "Miller", "18", "26");