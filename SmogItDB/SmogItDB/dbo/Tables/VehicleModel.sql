CREATE TABLE [dbo].[VehicleModel]
(
	[ModelId] SMALLINT  IDENTITY (1, 1) NOT NULL, 
    [MakeId] SMALLINT NULL, 
    [Model] VARCHAR(50) NULL,
    CONSTRAINT [PK_VehicleModel] PRIMARY KEY CLUSTERED ([ModelId] ASC),
    CONSTRAINT [FK_VehicleModel_VehicleMake] FOREIGN KEY ([MakeId]) REFERENCES [dbo].[VehicleMake] ([MakeId])
)
