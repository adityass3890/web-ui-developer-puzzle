import { Component, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { getReadingList, removeFromReadingList, undoRemoveFromReadingList, toggleMarkedAsRead, undoToggledMarkedAsRead } from '@tmo/books/data-access';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs/operators';
import { ReadingListItem } from '@tmo/shared/models';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  @Output() toggledMarkedAsRead = new EventEmitter<ReadingListItem>();
  readingList$ = this.store.select(getReadingList);

  constructor(private readonly store: Store, private snackbar: MatSnackBar) {}

  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
    const snackBarRef = this.snackbar.open(
      `${item.title} removed from your reading list!`,
      'Undo',
      { duration: 5000 }
    );

    snackBarRef
      .onAction()
      .pipe(take(1))
      .subscribe(() =>
        this.store.dispatch(undoRemoveFromReadingList({ item }))
      );
  } 

  onToggledMarkedAsRead(item: ReadingListItem) {
    const readStatus = item.finished ? 'unread' : 'read';
    const message = `${item.title} marked as ${readStatus}`;
    this.store.dispatch(toggleMarkedAsRead({ item }));

    const snackBarRef = this.snackbar.open(message, 'Undo', { duration: 5000 });

    snackBarRef
      .onAction()
      .pipe(take(1))
      .subscribe(() => this.store.dispatch(undoToggledMarkedAsRead({ item })));
  }

}
