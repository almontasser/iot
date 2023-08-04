import { BOOLEAN, DOUBLE, INTEGER, JSON, STRING, Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "mysql",
  database: "iot",
  username: "root",
  password: "123456",
});

export const User = sequelize.define(
  "user",
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: STRING(50),
      allowNull: false,
    },
    email: {
      type: STRING(50),
      allowNull: false,
      unique: true,
    },
    password: {
      type: STRING(50),
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Employee = sequelize.define(
  "employee",
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: STRING(50),
      allowNull: false,
    },
    key: {
      type: STRING(50),
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Facility = sequelize.define(
  "facility",
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: STRING(50),
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Anchor = sequelize.define(
  "anchor",
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    key: {
      type: STRING(50),
      allowNull: false,
      unique: true,
    },
    facility_id: {
      type: INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Gas = sequelize.define(
  "gas",
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    anchor_id: {
      type: INTEGER,
      allowNull: false,
    },
    gas: {
      type: BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Reading = sequelize.define(
  "reading",
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    employee_id: {
      type: INTEGER,
      allowNull: false,
    },
    sys: {
      type: INTEGER,
      allowNull: false,
    },
    dia: {
      type: INTEGER,
      allowNull: false,
    },
    hr: {
      type: INTEGER,
      allowNull: false,
    },
    spo2: {
      type: DOUBLE,
      allowNull: false,
    },
    ranges: {
      type: JSON,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Emergency = sequelize.define(
  "emergency",
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    employee_id: {
      type: INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

Employee.hasMany(Reading, { foreignKey: "employee_id" });
Reading.belongsTo(Employee, { foreignKey: "employee_id" });

Facility.hasMany(Anchor, { foreignKey: "facility_id" });
Anchor.belongsTo(Facility, { foreignKey: "facility_id" });

Anchor.hasMany(Gas, { foreignKey: "anchor_id" });
Gas.belongsTo(Anchor, { foreignKey: "anchor_id" });

Employee.hasMany(Emergency, { foreignKey: "employee_id" });
Emergency.belongsTo(Employee, { foreignKey: "employee_id" });

export default sequelize;
