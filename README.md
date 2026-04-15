# Vue3 Standard Template

A simplified Vue 3 admin template that follows a RuoYi-style directory layout.

## Quick Start

```bash
npm install
npm run dev
```

## Structure

See [docs/project-structure.md](./docs/project-structure.md).

Current structure highlights:

- `src/views` holds pages directly, for example `views/system/user/index.vue`
- `src/components` uses folder-style shared components such as `Pagination/index.vue`
- `src/constants` stores shared application constants
- `src/store/modules` holds Pinia modules
- `src/router/guards.ts` keeps route guard logic with the router
- `src/i18n` is the optional internationalization entry

## Included Demos

- `src/components/Pagination/index.vue`
- `src/components/SearchToolbar/index.vue`
- `src/components/RightToolbar/index.vue`
- `src/constants/index.ts`
- `src/views/system/user/index.vue`
- `src/views/index.vue`
- `src/api/system/user.ts`
- `src/router/guards.ts`
- `src/i18n/index.ts`

## Notes

- Add pages under `src/views/<module>/<page>/index.vue`
- Group API files by domain under `src/api/<domain>`
- Keep reusable components under `src/components/<Name>`
- Keep route definitions and guards under `src/router`
