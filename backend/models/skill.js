'use strict'

module.exports = (sequelize, DataTypes) => {
  var Skill = sequelize.define('Skill', {
    // general info
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    class: DataTypes.STRING,
    tree: DataTypes.STRING,
    min: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    max: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 10 },
    // bonuses
    metal: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    crystal: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    oil: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    size: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    energy: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    influence: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    attack: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    defense: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    speed: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    exploration: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    construction: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    destruction: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    fighter: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    cruiser: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    bomber: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    orbiter: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    recycler: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    carrier: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    furnace: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    factory: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    refinery: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    plant: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    barrier: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    warehouse: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    blaster: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    railgun: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    cannon: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    turns: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    experience: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    aether: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 }
  }, {
    classMethods: {
      associate: (models) => {
        // m2o self referencing association
        models.Skill.hasMany(models.Skill, { as: 'children', foreignKey: 'parentId' })
        // o2m self referencing association
        models.Skill.belongsTo(models.Skill, { as: 'parent', foreignKey: 'parentId' })
      }
    },
    timestamps: false,
    freezeTableName: true
  })
  return Skill
}
