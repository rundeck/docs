---
navbar: false
sidebar: false
---

<ClientOnly>
  <OpenApiExplorer 
    specFile="/files/rundeck-api.yml"
    :collapse="true"
    layout="row"
    renderStyle="view"
    :showHeader="false"
    :hideConsole="false"
    :hideAuthentication="false"
    :usePathInNavBar="false"
  />
</ClientOnly>