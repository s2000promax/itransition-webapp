import { Component, OnInit } from '@angular/core';

import { UserListInterface } from '@config/types/user/user.interface';

@Component({
    selector: 'mc-controlledTable',
    templateUrl: './controlledTable.component.html',
    styleUrls: ['./controlledTable.component.scss'],
})
export class ControlledTableComponent implements OnInit {
    usersList!: Array<UserListInterface>;
    selectedUser!: Array<UserListInterface>;

    ngOnInit() {
        this.usersList = [
            {
                id: '1',
                username: 'Grigory Malkov',
                email: 'gr3091@mail.com',
                createdAt: new Date('2013-04-17'),
                lastLoginAt: new Date('2023-08-03'),
                status: true,
            },
            {
                id: '2',
                username: 'Grigory Malkov',
                email: 'gr3091@mail.com',
                createdAt: new Date('2013-04-17'),
                lastLoginAt: new Date('2023-08-03'),
                status: true,
            },
            {
                id: '3',
                username: 'Grigory Malkov',
                email: 'gr3091@mail.com',
                createdAt: new Date('2013-04-17'),
                lastLoginAt: new Date('2023-08-03'),
                status: false,
            },
            {
                id: '4',
                username: 'Grigory Malkov',
                email: 'gr3091@mail.com',
                createdAt: new Date('2013-04-17'),
                lastLoginAt: new Date('2023-08-03'),
                status: false,
            },
            {
                id: '5',
                username: 'Grigory Malkov',
                email: 'gr3091@mail.com',
                createdAt: new Date('2013-04-17'),
                lastLoginAt: new Date('2023-08-03'),
                status: true,
            },
        ];
    }
}
