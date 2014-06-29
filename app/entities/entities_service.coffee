angular.module 'graphen-entities'
  
  .factory 'Entities', ->
    {
      data: [
        {
          name: "User Story",
          instances: [{
            name: "User Story 1",
            description: "User Story 1 Description"
          },{
            name: "User Story 2",
            description: "User Story 2 Description"
          }]
        },
        {
          name: "Scenario",
          instances: [{
            name: "Scenario 1",
            description: "Scenario 1 Description"
          },{
            name: "Scenario 2",
            description: "Scenario 2 Description"
          }]
        },
        {
          name: "Model",
          instances: [{
            name: "Model 1",
            description: "Model 1 Description"
          },{
            name: "Model 2",
            description: "Model 2 Description"
          }]
        }
      ]

      default: {name: ""}

      all: -> @data

      create: (name) ->
        @data.push
          name: name
    }