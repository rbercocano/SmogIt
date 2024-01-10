/*
Post-Deployment Script Template              
--------------------------------------------------------------------------------------
 This file contains SQL statements that will be appended to the build script.    
 Use SQLCMD syntax to include a file in the post-deployment script.      
 Example:      :r .\myfile.sql                
 Use SQLCMD syntax to reference a variable in the post-deployment script.    
 Example:      :setvar TableName MyTable              
               SELECT * FROM [$(TableName)]          
--------------------------------------------------------------------------------------
*/
IF NOT EXISTS(SELECT [StatusId] FROM [dbo].[Status] WHERE [StatusId] = 1 AND [StatusName] = N'Pending')
BEGIN
  INSERT [dbo].[Status] ([StatusId], [StatusName]) VALUES (1, N'Pending')
END
IF NOT EXISTS(SELECT [StatusId] FROM [dbo].[Status] WHERE [StatusId] = 2 AND [StatusName] = N'In Progress')
BEGIN
  INSERT [dbo].[Status] ([StatusId], [StatusName]) VALUES (2, N'In Progress')
END
IF NOT EXISTS(SELECT [StatusId] FROM [dbo].[Status] WHERE [StatusId] = 3 AND [StatusName] = N'Completed')
BEGIN
  INSERT [dbo].[Status] ([StatusId], [StatusName]) VALUES (3, N'Completed')
END
IF NOT EXISTS(SELECT [StatusId] FROM [dbo].[Status] WHERE [StatusId] = 4 AND [StatusName] = N'Canceled')
BEGIN
  INSERT [dbo].[Status] ([StatusId], [StatusName]) VALUES (4, N'Canceled')
END