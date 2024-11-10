# csc436_assignment4
# Backend - Part1: Todo Items Web API


https://github.com/bodonnell-DePaul/Assignment4/assets/5862378/10ff27d5-8aa2-4bde-913c-704eeca7d54b


## Requirements:

1. **.NET 8.0 SDK**: You will need the .NET 8.0 SDK installed on your machine. You can download it from [here](https://dotnet.microsoft.com/download).
   - It is not a requirement to use Dev Containers but I do recommend it.  There are Dev Containers available that already come with dotnet 8 installed

3. **Visual Studio Code or Visual Studio 2022**: We will be using Visual Studio Code as our code editor. You can download it from [here](https://visualstudio.com/).
   
4. **Recommended Extensions for VS Code:
   - .NET Install Tool
   - C#
   - C# Dev Kit (especially if you are already familiar with development in full Visual Studio)
   - REST Client

## Instructions:

1. **Create a new .NET 8.0 project**: Use the `dotnet new` command to create a new .NET 8.0 project. The `webapi` template is a good starting point for building a Web API.

2. **Create a `TodoItem` class**: This class should have the following properties: `Title`, `Description`, `DueDate`, and `List`. All properties should have `get` and `set` accessors.

3. **Create a list of `TodoItem` objects**: This list will serve as our "database" for this project. You can populate this list with some initial data.
 ```C#
 List<TodoItem> todoItems = new List<TodoItem>
{
    new TodoItem { Title = "Learn C#", Description = "Learn C# and .NET", DueDate = DateTime.Now.AddDays(1), List = "Personal" },
    new TodoItem { Title = "Build a Web API", Description = "Build a Web API using ASP.NET Core", DueDate = DateTime.Now.AddDays(2), List = "Work" },
    new TodoItem { Title = "Build a Single Page Application", Description = "Build a Single Page Application using Angular or React", DueDate = DateTime.Now.AddDays(3), List = "Work" },
    new TodoItem { Title = "Setup CI/CD", Description = "Setup CI/CD using Azure DevOps", DueDate = DateTime.Now.AddDays(4), List = "Work" },
    new TodoItem { Title = "Write Unit Tests", Description = "Write unit tests for the API and SPA", DueDate = DateTime.Now.AddDays(5), List = "Work" },
    new TodoItem { Title = "Code Review", Description = "Perform code review for the API and SPA", DueDate = DateTime.Now.AddDays(6), List = "Work" },
    new TodoItem { Title = "Prepare for Interview", Description = "Prepare for technical interviews", DueDate = DateTime.Now.AddDays(7), List = "Personal" },
    new TodoItem { Title = "Take a Break", Description = "Take a break and enjoy the weekend", DueDate = DateTime.Now.AddDays(8), List = "Personal" },
    new TodoItem { Title = "Todo 1", Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad", DueDate=DateTime.Now.AddDays(1)},
    new TodoItem { Title = "Todo 2", Description = "minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in", DueDate=DateTime.Now.AddDays(3)},
    new TodoItem { Title = "Todo 3", Description = "reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in", DueDate=DateTime.Now.AddDays(5)},
    new TodoItem { Title = "Todo 4", Description = "culpa qui officia deserunt mollit anim id est laborum.", DueDate=DateTime.Now.AddDays(8) }
};
```

4. **Create a `GET` endpoint**: This endpoint should return a list of `TodoItem` objects. If a `list` parameter is provided in the request, the endpoint should return only the `TodoItem` objects that belong to the specified list. If no `list` parameter is provided, the endpoint should return all `TodoItem` objects.

5. **Create a `POST` endpoint**: This endpoint should accept a `TodoItem` object in the request body and add it to the list of `TodoItem` objects.

## Hints:
- Make sure you use the minimalAPI template for your C# project.  If you do not specifically use the webapi template then dotnet will try to create a controller based API which we do not want!
- In VS Code the key combination of ctrl+shift+p is your friend.  Use it!
- Use the `MapGet` method to map the `GET` endpoint. The `{list?}` part of the route makes the `list` parameter optional.
- Use the `MapPost` method to map the `POST` endpoint. The `TodoItem` parameter of the handler function is automatically populated from the request body.
- Use the `Results.Ok` method to create a 200 OK response. Use the `Results.Created` method to create a 201 Created response.
- Use the `Where` method to filter the `TodoItem` objects based on the `List` property.

## Documentation:
- [ASP.NET Core documentation](https://docs.microsoft.com/en-us/aspnet/core/?view=aspnetcore-8.0)
- [Create Minimal APIs](https://learn.microsoft.com/en-us/aspnet/core/tutorials/min-web-api?view=aspnetcore-8.0&tabs=visual-studio)
- [Minimal API Overview](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/minimal-apis/overview?view=aspnetcore-8.0)

