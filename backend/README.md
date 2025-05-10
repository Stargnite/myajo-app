```npm install```

## Firebase
```firebase login```
```firebase init emulators```

## Start the emulator

```firebase emulators:start --only auth```

**The emulator will print out an API key placeholder**

## Get started with Supabase
```supabase login```
```supabase init```

## First migration
```supabase migration new create_users_table```

## Apply migration
```supabase db push```

## OR if supabase is not in your cli
```npx knex init
npx knex migrate:make create_users_table --env production
npx knex migrate:latest --env production
```

