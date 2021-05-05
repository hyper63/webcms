# README

hyper website cms


## API

### FAQs

* GET /api/faqs - list all faqs
* POST /api/faqs - create faq document
* GET /api/faqs/:id - get single faq
* PUT /api/faqs/:id - update 
* DELETE /api/faqs/:id - delete faq

## Models

### FAQ Document

- id - unique identifer
- type - 'faq'
- question - string
- answer - string
- tags - string[]
- created - date ISO....
- updated - date ISO...


## architect

* api - handles request and response
* core - business logic (No SideEffect Zone)

  -- Responsible for Schema Validation
  -- Responsible for calculations
  -- Responsible error handling

* services - data, search, etc

// middleware core = createCore(services)
