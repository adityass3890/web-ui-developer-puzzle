# T-Mobile Dev Puzzle 

### Code Review

# Fix Variable Names

# Should follow Unique Naming (fixed)
When compared both reading-list.reducer.spec.ts and reading-list.selectors.spec.ts
book-search.cponent.spec.ts
   BookSearchItemComponent


# Custom pipe
book-search.component.html
<strong>Published:</strong> {{ formatDate(b.publishedDate) }}
we can use custom date pipe instead of formatDate

### Accessibility

app.component.html
Accessibility check failing due to button do not have an accessible name 
<button mat-icon-button (click)="drawer.close()">

book-search.component.html
Accessibility check failing due to button do not have an accessible name 
<button mat-icon-button matSuffix>

### Testcases Failing
Test Cases are failing - reading-list.reducer.spec
Added failedRemoveFromReadingList and failedAddToReadingList reducers