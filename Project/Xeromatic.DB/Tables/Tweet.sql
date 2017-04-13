CREATE TABLE [dbo].[Tweet]
(
    [Id]    BIGINT          NOT NULL,
    [Text]  NVARCHAR(1000)   NOT NULL
    /*
     *  Tweet text size is 1000 because we can no longer assume that it will be 140 characters.
     *  https://github.com/linvi/tweetinvi/wiki/Extended-Tweets-&-TweetMode
     */

    CONSTRAINT [PK_Subscription] PRIMARY KEY CLUSTERED ([Id] ASC)
)
