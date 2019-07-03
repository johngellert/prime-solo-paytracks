CREATE DATABASE paytracks_database;

--DROP TABLES--

DROP TABLE "user" CASCADE;
DROP TABLE "business";
DROP TABLE "employee";
DROP TABLE "employee_business";
DROP TABLE "address";
DROP TABLE "contact_info";
DROP TABLE "withholding";
DROP TABLE "payment";



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
	"stateTaxid" VARCHAR (80),
	"streetAddress" VARCHAR (120) NOT NULL,
	"city" VARCHAR (80) NOT NULL,
	"state" VARCHAR (2) NOT NULL,
	"zip" VARCHAR (10) NOT NULL,
	"mobilePhone" VARCHAR (11) NOT NULL,
	"alternatePhone" VARCHAR (15),
	"email" VARCHAR (80) NOT NULL,
	"user_id" INT REFERENCES "user"
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
	"isTaxable" BOOLEAN -- may be taxable for some businesses but not for others
	);

CREATE TABLE "address" (
	"id" SERIAL PRIMARY KEY,
	"street" VARCHAR (120) NOT NULL,
	"city" VARCHAR (80) NOT NULL,
	"state" VARCHAR (2) NOT NULL,
	"zip" VARCHAR (10) NOT NULL,
	"employee_id" INT REFERENCES "employee" NOT NULL
);

CREATE TABLE "contact_info" (
	"id" SERIAL PRIMARY KEY,
	"mobilePhone" VARCHAR (11) NOT NULL,
	"alternatePhone" VARCHAR (15) NOT NULL,
	"email" VARCHAR (80) NOT NULL,
	"employee_id" INT REFERENCES "business" NOT NULL
);

CREATE TYPE marital_status AS ENUM ('Married', 'Single');
CREATE TABLE "withholding" (
	"id" SERIAL PRIMARY KEY,
	"federalAllowances" INT NOT NULL,
	"stateAllowances" INT NOT NULL,
	"maritalStatus" marital_status NOT NULL,
	"employeePaysFica" BOOLEAN NOT NULL,
	"federalPayPeriods" INT NOT NULL,
	"statePayPeriods" INT NOT NULL,
	"employee_id" INT REFERENCES "employee" NOT NULL
);

CREATE TYPE payment_method AS ENUM ('Cash', 'Check');
CREATE TABLE "payment" (
	"id" SERIAL PRIMARY KEY,
	"period" INT NOT NULL,
	"periodStart" DATE NOT NULL,
	"periodEnd" DATE NOT NULL,
	"paymentDate" DATE NOT NULL,
	"paymentType" payment_method NOT NULL,
	"checkNumber" VARCHAR (20) NOT NULL,
	"grossWages" MONEY NOT NULL,
	"netPay" MONEY NOT NULL,
	"federalWithholding" MONEY NOT NULL,
	"stateWithholding" MONEY NOT NULL,
	"employeeFica" MONEY NOT NULL,
	"employeerFica" MONEY NOT NULL,
	"employee_business_id" INT REFERENCES "employee_business" NOT NULL
);