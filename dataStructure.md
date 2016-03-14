# App Structure/Overview

## Login
Standalone "redux app""

* Login form
* User logs in
* login is in flight - spinner showing processing of login
* login fails - message saying login failed
* login succeeds - message saying login successful, redirected to home page

app state Structure

```
{
isRequestInFlight: boolean,
isError: boolean
}
```

## Full App Structure

State to manage
### User state
* User specific - profile name, profile picture, preferences
* User's assets - e.g. lists, groups

```
{
    userInfo: {
        username: String,
        lastLoggedIn: Date,
        imageUrl: String/url
    },
    userPreferences: {
        canEmail: boolean,
        liveUpdates: boolean
    },
    lists: List<id>, // ids to lists
    groups: List<id>, // ids to groups
}
```

### List state
* List identity information - list name, deadlines, list type. Anything that describes what the list is
* List Items - description, isDone, assignee, etc
* Chat messages

```
{
    listInfo: {
        name: String,
        createdOn: Date,
        owner: id, //user who owns the list
        listType: Enum, //type of list this is
        isActive: boolean //is list still active?
    },
    items: List<item>,
    messages: List<message>
}
```

### Group state
* Group identity information
* Lists
* Chat messages

```
{
    groupInfo: {
        name: String,
        createdOn: Date,
        owner: id, //user who owns the list
        groupType: Enum, //type of list this is
        isActive: boolean //is list still active?
        expirationDate: Date, //when group will expire
        reminderDate: Date,
        description: string
    },
    lists: List<id>, //ids of lists in this group
    messages: List<message>
}
```
