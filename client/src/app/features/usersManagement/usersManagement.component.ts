import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '@services/user.service';
import { UserInterface, Users } from '@config/types/user/user.interface';
import { LoaderService } from '@services/loader.service';
import { ControlledTableComponent } from '@shared/uiKit/controlledTable/controlledTable.component';
import { tap } from 'rxjs';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy({
    checkProperties: true,
})
@Component({
    selector: 'mc-usersControlTable',
    templateUrl: './usersManagement.component.html',
})
export class UsersManagementComponent implements OnInit {
    isLoading$ = this.loaderService.getIsLoading;
    selectedUsers: Users = [];

    @ViewChild(ControlledTableComponent)
    controlledTableComponent!: ControlledTableComponent;

    constructor(
        private userService: UserService,
        private loaderService: LoaderService,
    ) {}

    ngOnInit() {
        this.getAllUsers();
    }

    private getAllUsers() {
        this.userService.fetchAll().subscribe();
    }

    updateSelectedUsers(selectedUsers: Users) {
        this.selectedUsers = selectedUsers;
    }

    blockSelectedUsers() {
        if (!!this.selectedUsers.length) {
            this.userService.update(this.selectedUsers, true).subscribe({
                next: () => {
                    this.clearSelection();
                },
                error: (err) => {
                    // console.log('39', err)
                },
            });
        }
    }

    unblockSelectedUsers() {
        if (!!this.selectedUsers.length) {
            this.userService
                .update(this.selectedUsers, false)
                .subscribe(() => this.clearSelection());
        }
    }

    deleteSelectedUsers() {
        if (!!this.selectedUsers.length) {
            this.userService
                .delete(this.selectedUsers)
                .subscribe(() => this.clearSelection());
        }
    }

    private clearSelection() {
        this.controlledTableComponent.clearSelection();
        this.selectedUsers = [];
    }
}
