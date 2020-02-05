import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Employee } from '../../../shared/models/employee.model';
import { FollowModel, UserFollow } from '../../../shared/models/follow.model';

@Component({
  selector: 'app-profile-subscriptions',
  templateUrl: './profile-subscriptions.component.html',
  styleUrls: ['./profile-subscriptions.component.scss']
})
export class ProfileSubscriptionsComponent implements OnChanges {
  @Input()
  selectedUser: Employee;

  @Input()
  users$: Observable<Employee[]>;

  @Input()
  userFollow: UserFollow;

  @Output()
  addFollow = new EventEmitter<FollowModel>();

  @Output()
  deleteFollowing = new EventEmitter<string>();

  public following: Employee[];
  public followers: Employee[];

  public removedFromMe: FollowModel[];
  public addedForMe: FollowModel[];
  public IRemovedFrom: FollowModel[];

  public followingForm = new FormControl();

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.userFollow && changes.userFollow.currentValue) {
      this.following = this.userFollow.following;
      this.followers = this.userFollow.followers;

      this.removedFromMe = this.userFollow.allForUser.filter(
        follow => follow.followType === 'remove' && follow.followerId._id === this.selectedUser._id
      );
      this.addedForMe = this.userFollow.allForUser.filter(
        follow => follow.followType === 'add' && follow.followerId._id === this.selectedUser._id
      );
      this.IRemovedFrom = this.userFollow.allForUser.filter(
        item => item.followingId._id === this.selectedUser._id && item.followType === 'remove'
      );
    }
  }

  public isAddedUser(user: Employee): boolean {
    return this.addedForMe && this.addedForMe.some(item => item.followingId._id === user._id);
  }

  public addFollowingByForm(): void {
    const data: FollowModel = {
      followingId: this.followingForm.value,
      followerId: this.selectedUser,
      followType: 'add'
    };

    this.addFollow.emit(data);
    this.followingForm.reset();
  }

  public removeFollowing(user: Employee) {
    if (this.isAddedUser(user)) {
      const follow = this.addedForMe.find(item => item.followingId._id === user._id);
      this.deleteFollowing.emit(follow._id);
    }

    const data: FollowModel = {
      followingId: user,
      followerId: this.selectedUser,
      followType: 'remove'
    };

    this.addFollow.emit(data);
  }

  public toggleFollow(user: Employee) {
    const isUserRemoved = this.removedFromMe.some(item => item.followingId._id === user._id);

    if (isUserRemoved) {
      const followId = this.removedFromMe.find(item => item.followingId._id === user._id)._id;
      this.deleteFollowing.emit(followId);
    }

    if (this.isAddedUser(user)) {
      const follow = this.addedForMe.find(item => item.followingId._id === user._id);
      this.deleteFollowing.emit(follow._id);
    } else {
      const data: FollowModel = {
        followingId: user,
        followerId: this.selectedUser,
        followType: 'add'
      };

      this.addFollow.emit(data);
    }
  }
}
