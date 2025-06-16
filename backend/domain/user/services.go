package user

type UserService struct {
	repo UserRepository
}

func NewUserService() *UserService {
	return &UserService{
		repo: UserRepository{},
	}
}

func (r *UserRepository) CreateUserService(user CreateUserProps) *UserBase {
	return r.CreateUser(user)
}

func (r *UserRepository) GetUserByIdService(id string) *UserBase {
	return r.GetUserById(id)
}