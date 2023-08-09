import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Users } from '@config/types/user/user.interface';

@Component({
    selector: 'mc-toolbar',
    templateUrl: './toolbar.component.html',
})
export class ToolbarComponent {
    @Input() selectedUsers: Users = [];
    @Output() block = new EventEmitter<void>();
    @Output() unblock = new EventEmitter<void>();
    @Output() delete = new EventEmitter<void>();

    blockUsers() {
        if (!this.isBlockDisabled) {
            this.block.emit();
        }
    }

    unblockUsers() {
        if (!this.isUnblockDisabled) {
            this.unblock.emit();
        }
    }

    deleteUsers() {
        if (!this.isDeleteDisabled) {
            this.delete.emit();
        }
    }

    get isBlockDisabled(): boolean {
        return !this.selectedUsers.some((user) => !user.isBlocked);
    }

    get isUnblockDisabled(): boolean {
        return !this.selectedUsers.some((user) => user.isBlocked);
    }

    get isDeleteDisabled(): boolean {
        return this.selectedUsers.length === 0;
    }
}
