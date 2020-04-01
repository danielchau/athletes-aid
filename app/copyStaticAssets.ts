import * as shell from "shelljs";

shell.cp("-R", "./server/files/*", "./dist");
shell.cp("-R", "./server/cert", "./dist");
