'use strict'

module.exports = (sequelize, DataTypes) => {
  var Player = sequelize.define('Player', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    token: DataTypes.STRING,
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    turns: DataTypes.INTEGER,
    metal: DataTypes.INTEGER,
    crystal: DataTypes.INTEGER,
    oil: DataTypes.INTEGER,
    aether: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: (models) => {
        // m2o association
        models.Player.belongsTo(models.Guild)
        // m2o association
        models.Player.belongsTo(models.Faction)
        // o2m association
        models.Player.hasMany(models.Planet)
        // custom m2m association with "quantity" to count ammount of resources of the same type
        var PlayerArtifact = sequelize.define('PlayerArtifact', {
          quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 1
          }
        }, {
          timestamps: false,
          freezeTableName: true
        })
        models.Artifact.belongsToMany(models.Player, {through: PlayerArtifact})
        models.Player.belongsToMany(models.Artifact, {through: PlayerArtifact})
      }
    },
    timestamps: false,
    freezeTableName: true
  })
  return Player
}
