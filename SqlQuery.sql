CREATE TABLE "Train" (
    "index" int NOT NULL,
	"Store" int  NOT NULL,
    "Dept" int  NOT NULL,
    "Date" date  NOT NULL,
    "Weekly_Sales" float  NOT NULL,
    "IsHoliday" varchar  NOT NULL,
    "Cities_y" varchar  NOT NULL,
    "States_y" varchar  NOT NULL,
    "Latitude" float  NOT NULL,
    "Longitude" float  NOT NULL,
    "Month" int  NOT NULL,
    "Year" int  NOT NULL,
    CONSTRAINT "pk_Train" PRIMARY KEY (
        "index"
     )
);