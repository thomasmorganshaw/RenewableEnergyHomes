USE PropertyData

IF NOT EXISTS (SELECT name 
                FROM [sys].[server_principals]
                WHERE name = N'ServiceUser')
BEGIN

	CREATE LOGIN [ServiceUser]
		WITH PASSWORD = 'Password1',
		DEFAULT_DATABASE = PropertyData,
		CHECK_POLICY = OFF,
		CHECK_EXPIRATION = OFF

	CREATE USER [ServiceUser] FOR LOGIN [ServiceUser]   
		WITH DEFAULT_SCHEMA = dbo

	GRANT EXECUTE ON SCHEMA :: dbo TO [ServiceUser] WITH GRANT OPTION;

END

GO