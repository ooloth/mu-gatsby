import S from '@sanity/desk-tool/structure-builder'

export default () =>
  S.list()
    .title('Content')
    .items([
      // List out all the document types in schema.js
      ...S.documentTypeListItems(),
      // Add a new list item for links by category
      // S.listItem()
      //   .title('Navigation links')
      //   .child(
      //     // List out all categories
      //     S.documentTypeList('link')
      //       .title('Nav links')
      //       .child(() =>
      //         S.documentList()
      //           .schemaType('link')
      //           .filter('category == "navigation"'),
      //       ),
      //   ),
    ])
