# Property Search

## Database Setup

### Either Option 1

- Restore `SQL/PropertyData.bak` to an existing SQL Server 2014 instance
- Run `SQL/CreateLoginAndUser.sql`

### Or Option 2

- Create a database called `PropertyData` on an existing SQL Server 2014 instance
- Run the file `SQL/DeploymentScript.sql`
- Run `SQL/CreateLoginAndUser.sql`

## Solution Setup

- Open `PropertySearch.sln` in Visual Studio (I used 2022, but should work fine with 2019)
- Update the **ConnectionStrings:PropertyData** setting in `appSettings.json` to replace `YOUR_SERVER_NAME` with the server name of your SQL Server 2014 instance
- Run with debugging

## Search

The following postcodes will demonstrate different search result scenarios:

- CO38WR
- S337ZP
- SW11AA
- LA229JU
