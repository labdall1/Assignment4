

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add CORS policy to allow requests from the frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowAll");


List<TodoItem> todoItems = new List<TodoItem>
{
    new TodoItem { Title = "Movie 1", Description = "blah blah blah", DueDate = DateTime.Now.AddDays(1), List = "Personal" },
    new TodoItem { Title = "Movie 2", Description = "blah blah blah", DueDate = DateTime.Now.AddDays(2), List = "Work" },
    new TodoItem { Title = "Movie 3", Description = "blah blah blah", DueDate = DateTime.Now.AddDays(3), List = "Work" },
    new TodoItem { Title = "Movie 4", Description = "blah blah blah", DueDate = DateTime.Now.AddDays(4), List = "Work" },
    new TodoItem { Title = "Movie 5", Description = "blah blah blah", DueDate = DateTime.Now.AddDays(5), List = "Work" },
    new TodoItem { Title = "Movie 6", Description = "blah blah blah", DueDate = DateTime.Now.AddDays(6), List = "Work" },
    new TodoItem { Title = "Movie 7", Description = "blah blah blah", DueDate = DateTime.Now.AddDays(7), List = "Personal" },
    new TodoItem { Title = "Movie 8", Description = "blah blah blah", DueDate = DateTime.Now.AddDays(8), List = "Personal" }
};

app.MapGet("/todoitems", (string? list) =>
{
    if (!string.IsNullOrEmpty(list))
    {
        var filteredItems = todoItems.Where(t => t.List.Equals(list, StringComparison.OrdinalIgnoreCase)).ToList();
        return Results.Ok(filteredItems);
    }
    return Results.Ok(todoItems);
})
.WithName("GetTodoItems")
.WithOpenApi();


app.MapPost("/todoitems", (TodoItem newItem) =>
{
    todoItems.Add(newItem);
    return Results.Created($"/todoitems/{newItem.Title}", newItem);
})
.WithName("AddTodoItem")
.WithOpenApi();

app.Run();


