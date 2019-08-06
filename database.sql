--CREATE TABLES--
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "business" (
	"id" SERIAL PRIMARY KEY,
	"businessName" VARCHAR (120) NOT NULL,
	"service" VARCHAR (120) NOT NULL,
	"employerIdentificationNumber" VARCHAR (80),
	"stateTaxId" VARCHAR (80),
	"streetAddress" VARCHAR (120),
	"city" VARCHAR (80),
	"state" VARCHAR (2),
	"zip" VARCHAR (10),
	"mobilePhone" VARCHAR (11),
	"alternatePhone" VARCHAR (15),
	"email" VARCHAR (80) NOT NULL,
	"user_id" INT REFERENCES "user" NOT NULL
);

CREATE TABLE "employee" (
	"id" SERIAL PRIMARY KEY,
	"firstName" VARCHAR (80) NOT NULL,
	"lastName" VARCHAR (80) NOT NULL
);

CREATE TABLE "employee_business" (
	"id" SERIAL PRIMARY KEY,
	"employee_id" INT REFERENCES "employee" NOT NULL,
	"business_id" INT REFERENCES "business" NOT NULL,
	"payPeriodFrequency" INT NOT NULL,
	"isTaxable" BOOLEAN NOT NULL, -- may be taxable for some businesses but not for others
	"isDeleted" BOOLEAN DEFAULT FALSE NOT NULL 
	);

CREATE TABLE "address" (
	"id" SERIAL PRIMARY KEY,
	"streetAddress" VARCHAR (120),
	"city" VARCHAR (80),
	"state" VARCHAR (2),
	"zipCode" VARCHAR (10),
	"employee_id" INT REFERENCES "employee" NOT NULL
);

CREATE TABLE "contact_info" (
	"id" SERIAL PRIMARY KEY,
	"mobilePhone" VARCHAR (11) NOT NULL,
	"alternatePhone" VARCHAR (15),
	"emailAddress" VARCHAR (80) NOT NULL,
	"employee_id" INT REFERENCES "employee" NOT NULL
);

CREATE TYPE marital_status AS ENUM ('Married', 'Single');
CREATE TABLE "withholding" (
	"id" SERIAL PRIMARY KEY,
	"federalAllowances" INT NOT NULL,
	"stateAllowances" INT NOT NULL,
	"maritalStatus" marital_status,
	"employerPaysEmployeesFica" BOOLEAN NOT NULL,
	"employee_id" INT REFERENCES "employee" NOT NULL
);

CREATE TABLE "payment" (
	"id" SERIAL PRIMARY KEY,
	"period" INT,
	"periodStart" DATE NOT NULL,
	"periodEnd" DATE NOT NULL,
	"paymentDate" DATE NOT NULL,
	"isCash" BOOLEAN NOT NULL,
	"checkNumber" VARCHAR (20) NOT NULL,
	"grossWages" MONEY NOT NULL,
	"netPay" MONEY NOT NULL,
	"federalWithholding" MONEY NOT NULL,
	"stateWithholding" MONEY NOT NULL,
	"employeesSocialSecurityMedicare" MONEY NOT NULL, 
    "employersSocialSecurityMedicare" MONEY NOT NULL,
	"employee_business_id" INT REFERENCES "employee_business" NOT NULL
);