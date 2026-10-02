Analyze this Express.js codebase and generate full OpenAPI 3.0 documentation with Swagger UI integration. Here's what to do:

## Step 1: Explore the codebase

- Find all route definitions (app.get, app.post, router.get, router.post, etc.)
- Find all controllers and their handler functions
- Find all celebrate/Joi validation schemas — these define the exact shape of request params, query, body, and headers for each endpoint
- Find authentication/authorization middleware (session-based auth with cookies)
- Find all response structures by reading controller logic — what each endpoint actually returns (status codes, JSON shape)
- Identify route prefixes and how routers are mounted in the app entry point

## Step 2: Generate the OpenAPI spec

Create a complete `swagger.json` (or `swagger.yaml` — pick whichever fits the project style) in the project root (or a `docs/` folder if one exists). The spec must include:

- `openapi: "3.0.0"` version
- Proper `info` block (extract title/description from package.json if available)
- `servers` block pointing to localhost with the port used in the project
- `securityDefinitions` / `components.securitySchemes` for cookie/session-based auth
- Every endpoint grouped by logical tags (derive tags from router file names or route prefixes)
- For each endpoint:
  - HTTP method and path
  - Summary and description (infer from handler names and logic)
  - Request parameters: path params, query params, request body — derive types and constraints directly from the Joi schemas used in celebrate middleware
  - All response codes the handler can return, with JSON schema for each response body
  - Security requirements where auth middleware is applied
- `components.schemas` for all reusable Joi schemas (convert Joi → JSON Schema)

## Step 3: Integrate swagger-ui-express

- Install `swagger-ui-express` (add to dependencies, not devDependencies)
- Create a route that serves the Swagger UI at `/api-docs`
- Import the generated spec and wire it up
- Make sure the middleware is registered BEFORE error handlers but AFTER body parsers

## Important rules

- Do NOT use jsdoc-based approaches or comment annotations — read the actual code and Joi schemas directly
- Do NOT generate placeholder/dummy schemas — every schema must reflect the real Joi validation
- If a Joi schema uses `.required()`, mark the field as required in OpenAPI
- If a Joi schema uses `.default(value)`, include the default in the spec
- Map Joi types accurately: `Joi.string()` → `type: string`, `Joi.number().integer()` → `type: integer`, `Joi.array().items(Joi.string())` → `type: array, items: { type: string }`, `Joi.object()` → nested object schema, `Joi.alternatives()` → `oneOf`, etc.
- Preserve `.min()`, `.max()`, `.pattern()`, `.valid()` (→ enum), `.email()` (→ format: email) and other Joi constraints as OpenAPI validation keywords
- For endpoints without celebrate validation, still document them — infer what you can from the handler code
- Group endpoints logically by tags
