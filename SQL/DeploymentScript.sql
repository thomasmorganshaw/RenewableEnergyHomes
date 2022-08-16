USE PropertyData

IF NOT EXISTS (SELECT * 
                 FROM INFORMATION_SCHEMA.TABLES 
                 WHERE TABLE_SCHEMA = 'dbo' 
                 AND  TABLE_NAME = 'Property')
BEGIN
    
	CREATE TABLE dbo.Property
	(
		Id INT NOT NULL IDENTITY(1,1),
		DateCreated DATETIME NOT NULL,
		Postcode VARCHAR(7),
		HouseNumber SMALLINT,
		HouseName NVARCHAR(255),
		AddressLine1 NVARCHAR(255),
		AddressLine2 NVARCHAR(255),
		AddressLine3 NVARCHAR(255),
		Town NVARCHAR(255),
		County NVARCHAR(255)
		CONSTRAINT PK_Property_ID PRIMARY KEY (ID)
	)

	CREATE INDEX IX_Property_Postcode ON dbo.Property (Postcode);   

END


IF NOT EXISTS (SELECT * 
                 FROM INFORMATION_SCHEMA.TABLES 
                 WHERE TABLE_SCHEMA = 'dbo' 
                 AND  TABLE_NAME = 'PropertySale')
BEGIN
    
	CREATE TABLE dbo.PropertySale
	(
		Id INT NOT NULL IDENTITY(1,1),
		PropertyId INT NOT NULL,
		DateOfSale DATE NULL,
		SaleAmount BIGINT NULL
		CONSTRAINT PK_PropertySale_Id PRIMARY KEY (Id),
		CONSTRAINT FK_PropertySale_Property FOREIGN KEY (PropertyId) REFERENCES Property(Id)
	)

END

GO

IF EXISTS (
	SELECT 1 from dbo.sysobjects
	WHERE [name] = 'PropertySalesByPostcode'
	AND [type] = 'P')
BEGIN
	DROP PROCEDURE dbo.PropertySalesByPostcode
END

GO

CREATE PROCEDURE dbo.PropertySalesByPostcode
    @Postcode VARCHAR(7)
AS
BEGIN

	SELECT
		p.Id,
		p.Postcode,
		p.HouseNumber,
		p.HouseName,
		p.AddressLine1,
		p.AddressLine2,
		p.AddressLine3,
		p.Town,
		p.County,
		ps.DateOfSale,
		ps.SaleAmount
	FROM dbo.Property p
	INNER JOIN 
	(
		SELECT
			PropertyId,
			DateOfSale,
			SaleAmount,
			ROW_NUMBER() OVER (PARTITION BY PropertyId ORDER BY DateOfSale DESC) AS MostRecent
		FROM dbo.PropertySale
	) ps ON ps.PropertyId = p.Id
	WHERE ps.MostRecent = 1
	AND p.Postcode = @Postcode

END

GO

IF NOT EXISTS (SELECT TOP(1) 1 FROM dbo.Property)
BEGIN

	INSERT INTO dbo.Property
	(
		DateCreated,
		Postcode,
		HouseNumber,
		HouseName,
		AddressLine1,
		AddressLine2,
		AddressLine3,
		Town,
		County
	)
	VALUES
		(GETDATE(), 'SW11AA', NULL, 'Buckingham Palace', NULL, NULL, NULL, 'London', NULL),

		(GETDATE(), 'CO38WR', 4, NULL, 'Robin Crescent', 'Stanway', NULL, 'Colchester', 'Essex'),
		(GETDATE(), 'CO38WR', 11, NULL, 'Robin Crescent', 'Stanway', NULL, 'Colchester', 'Essex'),
		(GETDATE(), 'CO38WR', 35, NULL, 'Robin Crescent', 'Stanway', NULL, 'Colchester', 'Essex'),
		(GETDATE(), 'CO38WR', 63, NULL, 'Robin Crescent', 'Stanway', NULL, 'Colchester', 'Essex'),
		
		(GETDATE(), 'S337ZP', 22, NULL, 'Edale Road', NULL, NULL, 'Edale', 'Derbyshire'),
		(GETDATE(), 'S337ZP', 47, NULL, 'Edale Road', NULL, NULL, 'Edale', 'Derbyshire')


END


IF NOT EXISTS (SELECT TOP(1) 1 FROM dbo.PropertySale)
BEGIN

	INSERT INTO dbo.PropertySale
	(
		PropertyId,
		DateOfSale,
		SaleAmount
	)
	VALUES
		(1, NULL, 4900000000),

		(2, DATEADD(MONTH, -20, GETDATE()), 400000),
		(2, DATEADD(MONTH, -90, GETDATE()), 300000),
		(2, DATEADD(MONTH, -175, GETDATE()), 200000),
		(3, DATEADD(MONTH, -135, GETDATE()), 150000),
		(3, DATEADD(MONTH, -115, GETDATE()), 200000),
		(3, DATEADD(MONTH, -95, GETDATE()), 250000),
		(3, DATEADD(MONTH, -60, GETDATE()), 300000),
		(3, DATEADD(MONTH, -30, GETDATE()), 350000),		
		(4, DATEADD(MONTH, -10, GETDATE()), 790000),
		(4, DATEADD(MONTH, -250, GETDATE()), 540000),
		(5, DATEADD(MONTH, -44, GETDATE()), 550000),
		(5, DATEADD(MONTH, -55, GETDATE()), 440000),

		(6, DATEADD(MONTH, -66, GETDATE()), 660000),
		(6, DATEADD(MONTH, -88, GETDATE()), 440000),
		(7, DATEADD(MONTH, -77, GETDATE()), 770000),
		(7, DATEADD(MONTH, -99, GETDATE()), 550000)

END