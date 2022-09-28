import { Component, OnInit } from '@angular/core';
import { Tweet } from '../interfaces/tweet';
import { TweetService } from '../services/tweet.service';
declare var $: any;
@Component({
  selector: 'app-my-tweets',
  templateUrl: './my-tweets.component.html',
  styleUrls: ['./my-tweets.component.css']
})
export class MyTweetsComponent implements OnInit {

  constructor(
    private tweetService: TweetService
  ) { }
  currentTweet: any;
  editSubmitted
  tweetList = []
  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    console.log(user.username)
    this.tweetService.getAllTweetsByUsername(user.username).subscribe(
      (data: any) => {
        console.log(data)
        this.tweetList = data;
      });
  }

  openEditTweetPopup(tweet: Tweet) {
    this.currentTweet = tweet;
    console.log("current tweet:", tweet);
    console.log("tweet: ", tweet);
    $('#editModal').appendTo("body").modal('show');

  }

  deleteTweet(tweetId: string) {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    this.tweetService
      .deleteTweet(tweetId, user.username)
      .subscribe((data: any) => this.refreshTweets());
  }

  refreshTweets() {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    console.log(user.username)
    this.tweetService.getAllTweetsByUsername(user.username).subscribe(
      (data: any) => {
        console.log(data)
        this.tweetList = data;
      });
  }

  likeTweet(tweetId: string) {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    this.tweetService.likeTweet(tweetId, user.username)
      .subscribe((data: any) => {
        this.refreshTweets();
      });
  }
}
