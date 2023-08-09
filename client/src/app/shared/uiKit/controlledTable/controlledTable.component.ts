import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '@services/user.service';
import { Users } from '@config/types/user/user.interface';
import { UntilDestroy } from '@ngneat/until-destroy';
import { LayoutService } from '@services/app.layout.service';

@UntilDestroy({
    checkProperties: true,
})
@Component({
    selector: 'mc-controlledTable',
    templateUrl: './controlledTable.component.html',
    styleUrls: ['./controlledTable.component.scss'],
})
export class ControlledTableComponent implements OnInit {
    usersList$!: Observable<Users>;

    @Output() selectedUsersChange = new EventEmitter<Users>();

    selectedUsers: Users = [];

    constructor(
        private userService: UserService,
        public layoutService: LayoutService,
    ) {}

    ngOnInit() {
        this.usersList$ = this.userService.getUsers;
    }

    updateSelectedUsers() {
        this.selectedUsersChange.emit(
            this.selectedUsers.map((user) => ({
                id: user.id,
                isBlocked: user.isBlocked,
            })),
        );
    }

    clearSelection() {
        this.selectedUsers = [];
    }
}
