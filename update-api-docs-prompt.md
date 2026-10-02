Update the existing OpenAPI/Swagger documentation to match the current state of the codebase.

## What to do

1. Find the existing swagger spec file (swagger.json, swagger.yaml, or openapi.json/yaml) in the project
2. Scan all route definitions, controllers, and celebrate/Joi validation schemas across the codebase
3. Compare the current codebase against the existing spec and identify:
   - New endpoints not yet documented
   - Removed endpoints still in the spec
   - Changed Joi schemas (added/removed/renamed fields, changed types, new constraints)
   - Changed response structures in controllers
   - New or removed middleware (auth, validation)
   - Changed route prefixes or router mounting

4. Update the spec to reflect the current codebase:
   - Add documentation for new endpoints with full request/response schemas
   - Remove entries for deleted endpoints
   - Update schemas where Joi validations changed — map all constraints accurately (required, min, max, pattern, valid/enum, default, etc.)
   - Update response codes and response body schemas
   - Update tags if new route groups appeared or old ones were removed
   - Update security requirements if auth middleware changed

## Rules

- Do NOT regenerate the spec from scratch — update the existing file to preserve any manual edits (custom descriptions, examples, notes)
- Do NOT touch endpoints whose code hasn't changed
- Show a summary of what changed before making edits
- If the swagger-ui-express integration is broken or missing, fix it
