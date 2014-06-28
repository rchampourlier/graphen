angular.module 'graphen-entities'
  
  .factory 'Entities', ->
    {
      default: {name: ""},
      #all: []
      all: [
        {name: "User Story"},
        {name: "Scenario"},
        {name: "Model"}
      ]
    }