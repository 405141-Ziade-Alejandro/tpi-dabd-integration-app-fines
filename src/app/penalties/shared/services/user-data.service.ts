import { inject, Injectable } from '@angular/core';
import { SessionService } from '../../../users/services/session.service';
import { ToastService } from 'ngx-dabd-grupo01';
import { Observable, map, catchError, of } from 'rxjs';
import { User } from '../../../users/models/user';
import { OwnerPlotService } from '../../../users/services/owner-plot.service';
import { UserService } from '../../../users/services/user.service';
import { Role } from '../../../users/models/role';
import { Plot } from '../../../users/models/plot';

export interface UserData {
  id: number;
  roles: Role[];
  plots: Plot[];
  plotIds: number[];
}

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private sessionService = inject(SessionService);
  private userService = inject(UserService);
  private ownerPlotService = inject(OwnerPlotService);
  private toastService = inject(ToastService);

  loadNecessaryData(): Observable<any> {
    const user: User = this.sessionService.getItem('user');
    const userId = user?.id || 1;

    const userData: UserData = {
      id: user.id || 1,
      roles: user.roles || [],
      plots: [
        {
          id: 3,
          balance: 0,
          blockNumber: '1',
          builtArea: '0',
          isActive: true,
          plotNumber: '1',
          plotStatus: 'CREATED',
          plotType: 'PAID',
          totalArea: '0',
        },
        {
          id: 8,
          balance: 0,
          blockNumber: '2',
          builtArea: '0',
          isActive: true,
          plotNumber: '2',
          plotStatus: 'CREATED',
          plotType: 'PAID',
          totalArea: '0',
        },
      ],
      plotIds: [3, 8],
    };

    return of(userData);

    return this.userService.getUserById(userId).pipe(
      map((response) => {
        const userData: UserData = {
          id: user.id || 1,
          roles: user.roles || [],
          plots: [],
          plotIds: [],
        };

        this.ownerPlotService
          .giveAllPlotsByOwner(response.ownerId || 1, 0, 100000)
          .subscribe(
            (response) => {
              userData.plots = response.content;
              userData.plotIds = response.content.map((plot) => plot.id);
            },
            (error) => {
              this.toastService.sendError(
                'Error recuperando sus lotes. Reinicie la pagina'
              );
            }
          );
      }),
      catchError((error) => {
        this.toastService.sendError(
          'Error al cargar los datos del usuario. Por favor, intente de nuevo.'
        );
        return of(null);
      })
    );
  }
}
