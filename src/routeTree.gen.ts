/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

import { Route as rootRouteImport } from './routes/__root'
import { Route as IndexRouteImport } from './routes/index'
import { Route as InteriorRouteImport } from './routes/interior'
import { Route as ExteriorRouteImport } from './routes/exterior'

const IndexRoute = IndexRouteImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRouteImport,
} as any)

const InteriorRoute = InteriorRouteImport.update({
  id: '/interior',
  path: '/interior',
  getParentRoute: () => rootRouteImport,
} as any)

const ExteriorRoute = ExteriorRouteImport.update({
  id: '/exterior',
  path: '/exterior',
  getParentRoute: () => rootRouteImport,
} as any)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/interior': typeof InteriorRoute
  '/exterior': typeof ExteriorRoute
}
export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/interior': typeof InteriorRoute
  '/exterior': typeof ExteriorRoute
}
export interface FileRoutesById {
  __root__: typeof rootRouteImport
  '/': typeof IndexRoute
  '/interior': typeof InteriorRoute
  '/exterior': typeof ExteriorRoute
}
export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/interior' | '/exterior'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/interior' | '/exterior'
  id: '__root__' | '/' | '/interior' | '/exterior'
  fileRoutesById: FileRoutesById
}
export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  InteriorRoute: typeof InteriorRoute
  ExteriorRoute: typeof ExteriorRoute
}

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/interior': {
      id: '/interior'
      path: '/interior'
      fullPath: '/interior'
      preLoaderRoute: typeof InteriorRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/exterior': {
      id: '/exterior'
      path: '/exterior'
      fullPath: '/exterior'
      preLoaderRoute: typeof ExteriorRouteImport
      parentRoute: typeof rootRouteImport
    }
  }
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  InteriorRoute: InteriorRoute,
  ExteriorRoute: ExteriorRoute,
}
export const routeTree = rootRouteImport
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

import type { getRouter } from './router.tsx'
import type { createStart } from '@tanstack/react-start'
declare module '@tanstack/react-start' {
  interface Register {
    ssr: true
    router: Awaited<ReturnType<typeof getRouter>>
  }
}
