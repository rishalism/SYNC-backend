import express from 'express'
const route = express()
import ProjectController from '../../adapters/ProjectsController'
import ProjectUseCase from '../../use_case/ProjectUseCase'
import projectRepository from '../repository/projectRepository'
import projectLeadAuth from '../middlewares/ProjectLeadAuth'
import TeaMemberAuth from '../middlewares/TeamMemberMiddleware'
import commonUserAuth from '../middlewares/CommonAuth'


const projectrepo = new projectRepository()
const projectusecase = new ProjectUseCase(projectrepo)
const projectcontroller = new ProjectController(
    projectusecase
)


//projects//
route.post('/', projectLeadAuth, (req, res, next) => projectcontroller.createProject(req, res, next))
route.get('/', projectLeadAuth, (req, res, next) => projectcontroller.getProjects(req, res, next))
route.get('/get/:projectId', projectLeadAuth, (req, res, next) => projectcontroller.GetcurrentProject(req, res, next))
route.delete('/:projectId', projectLeadAuth, (req, res, next) => projectcontroller.deleteProject(req, res, next))
route.put('/:projectId', projectLeadAuth, (req, res, next) => projectcontroller.editProject(req, res, next))
route.post('/add-member', TeaMemberAuth, (req, res, next) => projectcontroller.addMember(req, res, next))
route.post('/remove', projectLeadAuth, (req, res, next) => projectcontroller.removeMember(req, res, next))
route.patch('/access', projectLeadAuth, (req, res, next) => projectcontroller.UpdatePermissions(req, res, next))






export default route