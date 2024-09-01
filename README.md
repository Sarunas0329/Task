This is a database about motherboards

To run this you must use a browser that is using the unsafe version, since there isn't a working CORS policy.

To do this run this command and change the {browser name} to your browser:

`{browser name}.exe --user-data-dir="C://Chrome dev session" --disable-web-security "enter url here"`

To run the project, open DBeaver and create a new Database, right click it then press `Tools -> Restore`

Select the Format as **Custom** and the backup file as the dump file.

Next open a new Command Prompt, go to the `\.Net + React\ReactApp\ReactApp.Server` directory and run `dotnet run` to start the server

In another Command Prompt window, go to the `\.Net + React\ReactApp\reactApp.client` direcory and run `npm run dev` to start the client side
