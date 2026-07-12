# EcoSphere Backend — Node + Express + MongoDB (Mongoose) + JWT

## Folder structure

```
backend/
├── index.js                  # entry point — connects to MongoDB, then starts the server
├── package.json
├── .env.example
└── src/
    ├── app.js                # express app: middleware + route mounting
    ├── config/
    │   └── db.js              # mongoose.connect()
    ├── models/                # Mongoose schemas
    │   ├── User.js
    │   ├── CarbonEntry.js
    │   ├── EnergyEntry.js
    │   ├── WaterEntry.js
    │   ├── WasteEntry.js
    │   ├── Supplier.js
    │   └── Goal.js
    ├── middleware/
    │   ├── authMiddleware.js     # protect (JWT check), authorize (role check)
    │   ├── validateMiddleware.js # express-validator result handler
    │   └── errorMiddleware.js    # notFound + centralized errorHandler (incl. Mongoose errors)
    ├── utils/
    │   ├── asyncHandler.js
    │   ├── generateToken.js
    │   └── crudFactory.js        # generic CRUD used by 6 of the 7 controllers
    ├── controllers/
    │   ├── authController.js
    │   ├── carbonController.js
    │   ├── energyController.js
    │   ├── waterController.js
    │   ├── wasteController.js
    │   ├── supplierController.js
    │   ├── goalController.js
    │   └── dashboardController.js
    ├── routes/
    │   └── ... (unchanged from the Prisma version)
    └── validators/
        └── ... (unchanged from the Prisma version)
```

## Set up MongoDB Atlas (free tier)

1. Go to https://www.mongodb.com/cloud/atlas/register and create a free account.
2. Create a free **M0 cluster**.
3. Under **Database Access**, create a database user with a username/password (not your Atlas login).
4. Under **Network Access**, add an IP entry. For a hackathon, `0.0.0.0/0` (allow from anywhere) is the pragmatic choice — just know it means "any IP with the right credentials," not just your team.
5. Click **Connect > Drivers**, copy the connection string. It looks like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Replace `<password>` with the real password, and add a database name before the `?`:
   ```
   mongodb+srv://ecosphere_user:realpassword@cluster0.xxxxx.mongodb.net/ecosphere_db?retryWrites=true&w=majority
   ```

This one connection string is all any teammate needs — no LAN, no firewall rules, no one's laptop has to stay on.

## Run it

```bash
npm install
cp .env.example .env      # paste in your MONGODB_URI and a JWT_SECRET
npm run dev
```

No migration step needed — Mongoose creates collections automatically the first time you write to them.

## API Endpoints

All routes are prefixed with `/api`. Every route except `/auth/register` and `/auth/login` requires:
```
Authorization: Bearer <token>
```

### Auth
| Method | Route | Description |
|---|---|---|
| POST | `/auth/register` | Create a user, returns JWT |
| POST | `/auth/login` | Login, returns JWT |
| GET | `/auth/me` | Get current user (protected) |

### Carbon / Energy / Water / Waste / Suppliers / Goals
Each of these follows the same REST shape (`/api/carbon`, `/api/energy`, `/api/water`, `/api/waste`, `/api/suppliers`, `/api/goals`):

| Method | Route | Description |
|---|---|---|
| GET | `/` | List all records for the logged-in user |
| POST | `/` | Create a record |
| GET | `/:id` | Get one record |
| PUT | `/:id` | Update a record |
| DELETE | `/:id` | Delete a record |

### Dashboard
| Method | Route | Description |
|---|---|---|
| GET | `/dashboard/summary` | Aggregated ESG totals, goal progress, and a computed ESG score |

## Example requests

**Register**
```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Asha","email":"asha@example.com","password":"secret123"}'
```

**Create a carbon entry**
```bash
curl -X POST http://localhost:4000/api/carbon \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"source":"electricity","activityValue":120,"unit":"kWh","co2Equivalent":48}'
```

**Dashboard summary**
```bash
curl http://localhost:4000/api/dashboard/summary \
  -H "Authorization: Bearer <token>"
```

## Notes
- The `_id` MongoDB assigns each document works exactly like the `id` field the frontend already expects — no frontend changes needed for this switch.
- **Duplicate email on register**, **invalid ObjectId in a URL**, and **missing required fields** are all mapped to clean 400/409 responses in `errorMiddleware.js`.
- `esgScore` in the dashboard is a placeholder formula (goal progress + supplier rating) — swap it for your team's real methodology in `dashboardController.js` whenever you define one.
